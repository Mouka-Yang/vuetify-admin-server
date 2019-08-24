module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const checklistSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    type: { type: String, unique: true },
    methods: [String],
    results: [String],
    comments: { type: String, default: '' },
  });

  return mongoose.model('Checklist', checklistSchema);
};
