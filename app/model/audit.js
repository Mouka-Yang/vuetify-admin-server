module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const AuditSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    UserId: { type: mongoose.Types.ObjectId, ref: 'User' },
    Domain: { type: String, unique: true },
    StartDate: Date,
    EndDate: Date,
    VulsNum: {
      high: Number,
      med: Number,
      low: Number,
    },
    VulsDetail: {
      sqli: String,
      xss: String,
      upload: String,
      xxe: String,
      ssrf: String,
      cmdinject: String,
      csrf: String,
      urljump: String,
      auth: String,
      leakage: String,
      rce: String,
    },
  });

  return mongoose.model('Audit', AuditSchema);
};
