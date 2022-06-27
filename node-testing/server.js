import express from 'express';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import productRoutes from './routes.js'


const PORT = 5001;

dotenv.config();

connectDB();
const app = express();
app.use(express.json());

app.use("/api/products", productRoutes)

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message })
})

app.listen( PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

export default app