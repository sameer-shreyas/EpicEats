const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://sameershreyas:sameershreyas13@cluster0.oxkrupa.mongodb.net/Cluster0?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    
    const fetched_data = await mongoose.connection.db.collection("food_items");

    const data = await fetched_data.find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray();
    global.foodCategory = catData;
    global.food_items = data;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
};

module.exports = mongoDB;
