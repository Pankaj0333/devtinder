const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

// Optional: unique index to prevent duplicate tokens for the same user
tokenSchema.index({ userId: 1, token: 1 }, { unique: true });

module.exports = mongoose.model('Token', tokenSchema);
