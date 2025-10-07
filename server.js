// const express = require('express');
// const productRoutes = require('./routes/productRoutes');
// const connectDB = require('./config/database');
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/database.js';


const app = express();

// Middleware pour parser JSON
app.use(express.json());



// Test route
app.get("/", (req, res) => {
  res.send("E-Market API is running!");
});


// Utiliser les routes de produits
app.use("/products", productRoutes);



// Connexion à MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
