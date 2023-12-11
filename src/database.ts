import mongoose from 'mongoose';

const env = {
  MONGO_URI: 'mongodb+srv://ozmap:SER0wh8TAWlvA720@cluster0.ijhj2jv.mongodb.net/',
};

const init = async function () {
  await mongoose.connect(env.MONGO_URI);
};

export default init();
