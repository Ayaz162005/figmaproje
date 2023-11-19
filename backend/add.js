import mongoose from "mongoose";
import { creators, nfts } from "./fake-data/index.js";
import CreateModal from "./modals/CreateModal.js"; // assuming .js extension for ES6 modules
import NftsModal from "./modals/NftsModal.js"; // assuming .js extension for ES6 modules
import UserModal from "./modals/UserModal.js"; // assuming .mjs extension for ES6 modules

async function connectToDatabase() {
  try {
    await mongoose.connect(
      "mongodb+srv://ummanayaz07:Ayaz2005@cluster0.sytmxkw.mongodb.net/test"
    );
    console.log("Connected to MongoDB");

    // Once connected, call the function to insert data
    await insertData();

    // Close the MongoDB connection after inserting data (optional)
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function insertData() {
  try {
    // Insert creators data
    console.log("Inserting creators data");
    await CreateModal.insertMany(creators);
    console.log("Creators data inserted");

    // Insert nfts data
    console.log("Inserting NFTs data");
    await NftsModal.insertMany(nfts);
    console.log("NFTs data inserted");

    console.log("Data insertion completed successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
  }
}

// Call the function to connect to the database and insert data
connectToDatabase();
