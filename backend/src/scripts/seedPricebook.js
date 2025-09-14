// scripts/seedPricebook.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import PricebookEntry from "../models/PricebookEntry.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/pricebook";

async function main() {
  await mongoose.connect(MONGO_URI, { dbName: "pricebook" });
  console.log("Connected. Seeding…");

  const docs = [
    // APAC - Australia (from your sheet snippet examples)
    {
      region: "APAC",
      country: "Australia",
      supplier: "Direct",
      currency: "USD",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 48000,
        L2: 60000,
        L3: 72000,
        L4: 84000,
        L5: 96000,
      }, // fill realistic values or import
      yearly_without_backfill: {
        L1: 52000,
        L2: 64000,
        L3: 76000,
        L4: 88000,
        L5: 100000,
      },
      monthly_short_term: {
        L1: 6400,
        L2: 7600,
        L3: 8800,
        L4: 10000,
        L5: 11200,
      },
      monthly_long_term: { L1: 6000, L2: 7250, L3: 8500, L4: 9750, L5: 11000 },
    },

    // Europe - Austria (Euro) — numbers are indicative from structure shown
    {
      region: "Europe",
      country: "Austria",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 38995,
        L2: 44844.25,
        L3: 50693.5,
        L4: 56542.75,
        L5: 62400,
      },
      yearly_without_backfill: {
        L1: 42500,
        L2: 49000,
        L3: 55500,
        L4: 62000,
        L5: 68500,
      },
      monthly_short_term: { L1: 5199, L2: 5980, L3: 6762, L4: 7543, L5: 8325 },
      monthly_long_term: {
        L1: 5605.53125,
        L2: 6446.360937,
        L3: 7252.156055,
        L4: 8339.979463,
        L5: 9200,
      },
    },
    {
      region: "Europe",
      country: "Belgium",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 65000,
        L2: 74750,
        L3: 85962.5,
        L4: 96707.8125,
        L5: 111213.984375,
      },
      yearly_without_backfill: {
        L1: 73125,
        L2: 84093.75,
        L3: 96707.8125,
        L4: 111213.984375,
        L5: 127896.082031,
      },
      monthly_short_term: {
        L1: 8666.666667,
        L2: 9966.666667,
        L3: 11461.666667,
        L4: 12894.375,
        L5: 14828.53125,
      },
      monthly_long_term: {
        L1: 8125,
        L2: 9343.75,
        L3: 10745.3125,
        L4: 12088.476562,
        L5: 13901.748047,
      },
    },

    {
      region: "Latin America (LAM)",
      country: "Brazil",
      supplier: "Direct",
      currency: "USD",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 39000,
        L2: 44850,
        L3: 51577.5,
        L4: 58024.6875,
        L5: 66728.390625,
      },
      yearly_without_backfill: {
        L1: 43875,
        L2: 50456.25,
        L3: 58024.6875,
        L4: 66728.390625,
        L5: 76737.649219,
      },
      monthly_short_term: {
        L1: 5200,
        L2: 5980,
        L3: 6877,
        L4: 7736.625,
        L5: 8897.11875,
      },
      monthly_long_term: {
        L1: 4875,
        L2: 5606.25,
        L3: 6447.1875,
        L4: 7253.085937,
        L5: 8341.048828,
      },
    },

    {
      region: "Europe",
      country: "Bulgaria",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 30500,
        L2: 35075,
        L3: 40336.25,
        L4: 45378.28125,
        L5: 52185.023437,
      },
      yearly_without_backfill: {
        L1: 34312.5,
        L2: 39459.375,
        L3: 45378.28125,
        L4: 52185.023437,
        L5: 60012.776953,
      },
      monthly_short_term: {
        L1: 4066.666667,
        L2: 4676.666667,
        L3: 5378.166667,
        L4: 6050.4375,
        L5: 6958.003125,
      },
      monthly_long_term: {
        L1: 3812.5,
        L2: 4384.375,
        L3: 5042.03125,
        L4: 5672.285156,
        L5: 6523.12793,
      },
    },

    {
      region: "North America (NAM)",
      country: "Canada",
      supplier: "Direct",
      currency: "USD",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 48000,
        L2: 55200,
        L3: 63480,
        L4: 71415,
        L5: 82127.25,
      },
      yearly_without_backfill: {
        L1: 54000,
        L2: 62100,
        L3: 71415,
        L4: 82127.25,
        L5: 94446.3375,
      },
      monthly_short_term: {
        L1: 6400,
        L2: 7360,
        L3: 8464,
        L4: 9522,
        L5: 10950.3,
      },
      monthly_long_term: {
        L1: 6000,
        L2: 6900,
        L3: 7935,
        L4: 8926.875,
        L5: 10265.90625,
      },
    },

    {
      region: "Europe",
      country: "Denmark",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 54000,
        L2: 59000,
        L3: 64900,
        L4: 73012.5,
        L5: 82139.0625,
      },
      yearly_without_backfill: {
        L1: 59000,
        L2: 66080,
        L3: 73012.5,
        L4: 82139.0625,
        L5: 92406.445313,
      },
      monthly_short_term: {
        L1: 7200,
        L2: 7866.666667,
        L3: 8653.333333,
        L4: 9735,
        L5: 10951.875,
      },
      monthly_long_term: {
        L1: 6750,
        L2: 7375,
        L3: 8112.5,
        L4: 9126.5625,
        L5: 10267.382813,
      },
    },

    {
      region: "Africa",
      country: "Egypt",
      supplier: "Direct",
      currency: "USD",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 14000,
        L2: 16100,
        L3: 17710,
        L4: 19923.75,
        L5: 22414.21875,
      },
      yearly_without_backfill: {
        L1: 15750,
        L2: 18112.5,
        L3: 19923.75,
        L4: 22414.21875,
        L5: 25215.996094,
      },
      monthly_short_term: {
        L1: 1866.666667,
        L2: 2146.666667,
        L3: 2361.333333,
        L4: 2656.5,
        L5: 2988.5625,
      },
      monthly_long_term: {
        L1: 1750,
        L2: 2012.5,
        L3: 2213.75,
        L4: 2490.46875,
        L5: 2801.777344,
      },
    },

    {
      region: "Europe",
      country: "Estonia",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 30000,
        L2: 34500,
        L3: 37950,
        L4: 42693.75,
        L5: 48030.46875,
      },
      yearly_without_backfill: {
        L1: 33750,
        L2: 38812.5,
        L3: 42693.75,
        L4: 48030.46875,
        L5: 54034.277344,
      },
      monthly_short_term: {
        L1: 4000,
        L2: 4600,
        L3: 5060,
        L4: 5692.5,
        L5: 6404.0625,
      },
      monthly_long_term: {
        L1: 3750,
        L2: 4312.5,
        L3: 4743.75,
        L4: 5336.71875,
        L5: 6003.808594,
      },
    },

    {
      region: "Europe",
      country: "Finland",
      supplier: "Direct",
      currency: "Euro",
      paymentTerms: "60 Days",
      yearly_with_backfill: {
        L1: 54000,
        L2: 59000,
        L3: 64900,
        L4: 73012.5,
        L5: 82139.0625,
      },
      yearly_without_backfill: {
        L1: 59000,
        L2: 66080,
        L3: 73012.5,
        L4: 82139.0625,
        L5: 92406.445313,
      },
      monthly_short_term: {
        L1: 7200,
        L2: 7866.666667,
        L3: 8653.333333,
        L4: 9735,
        L5: 10951.875,
      },
      monthly_long_term: {
        L1: 6750,
        L2: 7375,
        L3: 8112.5,
        L4: 9126.5625,
        L5: 10267.382813,
      },
    },
  ];

  // idempotent upsert
  for (const d of docs) {
    await PricebookEntry.updateOne(
      {
        region: d.region,
        country: d.country,
        supplier: d.supplier,
        currency: d.currency,
        paymentTerms: d.paymentTerms,
      },
      { $set: d },
      { upsert: true }
    );
  }

  console.log("Seed complete.");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
