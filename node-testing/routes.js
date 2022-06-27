import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from "./controller/products.js";

const router = Router();
router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:productId', getProductById)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router;

