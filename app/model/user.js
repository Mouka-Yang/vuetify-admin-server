module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    _id: app.mongoose.Types.ObjectId,
    Username: { type: String, unique: true },
    Password: { type: String },
  });

  return mongoose.model('User', UserSchema);
};
