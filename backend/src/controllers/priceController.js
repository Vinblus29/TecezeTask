// controllers/priceController.js
import PricebookEntry from "../models/PricebookEntry.js";

const allowedLevels = ["L1", "L2", "L3", "L4", "L5"];
const allowedContracts = ["yearly", "monthly_short", "monthly_long"];

export const getOptions = async (req, res) => {
  // Return distinct lists for form dropdowns
  try {
    const regions = await PricebookEntry.distinct("region");
    const countriesByRegion = {};
    for (const r of regions) {
      countriesByRegion[r] = await PricebookEntry.find({ region: r }).distinct("country");
    }
    const suppliers = await PricebookEntry.distinct("supplier");
    const currencies = await PricebookEntry.distinct("currency");
    const paymentTerms = await PricebookEntry.distinct("paymentTerms");

    return res.json({
      regions,
      countriesByRegion,
      suppliers,
      currencies,
      paymentTerms,
      serviceLevels: allowedLevels,
      engagementTypes: [
        { value: "yearly", label: "Yearly" },
        { value: "monthly_short", label: "Monthly (Short-term ≤ 3 months)" },
        { value: "monthly_long", label: "Monthly (Long-term > 3 months)" }
      ]
    });
  } catch (e) {
    return res.status(500).json({ message: "Failed to load options", error: e.message });
  }
};

export const getQuote = async (req, res) => {
  try {
    const {
      region,
      country,
      supplier,
      currency,
      paymentTerms,
      serviceLevel,    // "L1".."L5"
      engagementType,  // "yearly" | "monthly_short" | "monthly_long"
      withBackfill     // boolean; only matters if engagementType === "yearly"
    } = req.body || {};

    // Validate
    if (!region || !country || !supplier || !currency || !paymentTerms)
      return res.status(400).json({ message: "Missing required commercial fields." });
    if (!allowedLevels.includes(serviceLevel))
      return res.status(400).json({ message: "Invalid service level." });
    if (!allowedContracts.includes(engagementType))
      return res.status(400).json({ message: "Invalid engagement type." });

    const entry = await PricebookEntry.findOne({ region, country, supplier, currency, paymentTerms });
    if (!entry) {
      return res.status(404).json({ message: "No matching pricebook entry found for the given selection." });
    }

    // Resolve the rate family and pick the level
    let rateFamily;
    if (engagementType === "yearly") {
      rateFamily = withBackfill ? entry.yearly_with_backfill : entry.yearly_without_backfill;
    } else if (engagementType === "monthly_short") {
      rateFamily = entry.monthly_short_term;
    } else {
      rateFamily = entry.monthly_long_term;
    }

    const amount = Number(rateFamily?.[serviceLevel] ?? 0);
    if (!amount || amount <= 0) {
      return res.status(404).json({
        message: `Rate not found for ${serviceLevel} (${engagementType}${engagementType === "yearly" ? withBackfill ? " with backfill" : " without backfill" : ""}).`
      });
    }

    return res.json({
      currency: entry.currency,
      amount,
      breakdown: {
        region: entry.region,
        country: entry.country,
        supplier: entry.supplier,
        paymentTerms: entry.paymentTerms,
        serviceLevel,
        engagementType,
        withBackfill: Boolean(withBackfill)
      }
    });
  } catch (e) {
    return res.status(500).json({ message: "Failed to calculate quote", error: e.message });
  }
};
