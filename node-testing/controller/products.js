import ProductModel from '../models/ProductModel.js'

export const createProduct = async (req, res, next) => {
    try {
        const createdProduct = await ProductModel.create(req.body);
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const allProducts = await ProductModel.find({});
        res.status(200).json(allProducts);
    } catch (error) {
        next(error)
    }
}

export const getProductById = async (req, res, next) => {
    try {
        const product = await ProductModel.findById(req.params.productId);
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404).send()
        }
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        let updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true }
        )
        if (updatedProduct) {
            res.status(200).json(updatedProduct)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }

};

export const deleteProduct = async (req, res, next) => {
    try {
        let deletedProduct = await ProductModel.findByIdAndDelete(req.params.productId)
        if (deletedProduct) {
            res.status(200).json(deletedProduct)
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error)
    }
};