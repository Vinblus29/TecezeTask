// models/PricebookEntry.js
import mongoose from "mongoose";

const levelRatesSchema = new mongoose.Schema(
  {
    // store by level key "L1" ..."L5"
    L1: { type: Number, default: 0 },
    L2: { type: Number, default: 0 },
    L3: { type: Number, default: 0 },
    L4: { type: Number, default: 0 },
    L5: { type: Number, default: 0 }
  },
  { _id: false }
);

const pricebookEntrySchema = new mongoose.Schema(
  {
    region: { type: String, index: true, required: true },
    country: { type: String, index: true, required: true },
    supplier: { type: String, default: "Direct" },
    currency: { type: String, required: true }, // e.g., USD, Euro
    paymentTerms: { type: String, default: "60 Days" },

    // Four “rate families”, each holding L1..L5
    yearly_with_backfill: { type: levelRatesSchema, default: () => ({}) },
    yearly_without_backfill: { type: levelRatesSchema, default: () => ({}) },
    monthly_short_term: { type: levelRatesSchema, default: () => ({}) },
    monthly_long_term: { type: levelRatesSchema, default: () => ({}) }
  },
  { timestamps: true }
);

pricebookEntrySchema.index({ region: 1, country: 1, supplier: 1, currency: 1, paymentTerms: 1 }, { unique: true });

export default mongoose.model("PricebookEntry", pricebookEntrySchema);
