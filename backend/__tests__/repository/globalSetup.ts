import mongoose from 'mongoose';

export default async () => {
  try{
    await mongoose.connect('mongodb+srv://yaroslavcebro:6vXul2Z6gq0oOcmv@cluster0.4jjc9pz.mongodb.net/?retryWrites=true&w=majority');
    console.log("Connection went successful");
  } catch(e) {
    console.log("Connection failed");
    console.log(e);
  }
};



