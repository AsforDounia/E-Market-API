const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

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
