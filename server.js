import express from 'express';
import connectDB from './config/database.js';
import productRoutes from './routes/productRoutes.js';
import usertRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';




const app = express();

// Middleware pour parser JSON
app.use(express.json());



// Test route
app.get("/", (req, res) => {
  res.send("E-Market API is running!");
});


// Utiliser les routes de produits
app.use("/products", productRoutes);

// Utiliser les routes d'utilisateurs
app.use("/users", usertRoutes);

// Utiliser les routes des categories
app.use("/categories", categoryRoutes);



// Connexion à MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
