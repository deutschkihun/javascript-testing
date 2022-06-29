import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../../controller/products';
import { createRequest, createResponse } from 'node-mocks-http';
import Product from '../../models/Product'
import newProduct from '../data/new-product.json'
import allProducts from '../data/all-products.json'

let req, res, next;
jest.mock('../../models/Product');

const productId = "fwefwefwefweionboerinbeoinberionerferferf";
const updatedProduct = { name: "updated product name", description: "updated product description" };
beforeEach(() => {
    req = createRequest();
    res = createResponse();
    next = jest.fn();
}) 

describe('Product controller create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    it('should have a createProduct funtcion', () => {
        expect(typeof createProduct).toBe("function")
    })

    it('should call ProductModel.create', async () => {
        await createProduct(req, res, next);
        expect(Product.create).toBeCalledWith(newProduct);
    })

    it('should return 201 response code', async () => {
        await createProduct(req,res,next);
        expect(res.statusCode).toBe(201)
        expect(res._isEndCalled()).toBeTruthy();
    })

    it("should return json body in response", async () => {
        Product.create.mockReturnValue(newProduct)
        await createProduct(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newProduct)
    })

    it('should handle errors when creating', async () => {
        const errorMessage = { message: 'description property missing'};
        const rejectedPromise = Promise.reject(errorMessage);
        Product.create.mockReturnValue(rejectedPromise)
        await createProduct(req, res, next);
        expect(next).toBeCalledWith(errorMessage)
    })
})

describe('Product Controller Get', () => {
    it('should have a getProducts function', () => {
        expect(typeof getProducts).toBe('function');
    })

    it('should call ProductModel.find({})', async () => {
        await getProducts(req,res,next);
        expect(Product.find).toHaveBeenCalledWith({})
    })

    it('should return 200 response', async () => {
        await getProducts(req, res, next);
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy();
    })

    it('should return json body in response', async () => {
        Product.find.mockReturnValue(allProducts);
        await getProducts(req, res, next);
        expect(res._getJSONData()).toStrictEqual(allProducts)
    })

    it('should handle errors when finding all products', async () => {
        const errorMessage = { message: 'Error finding product data'};
        const rejectedPromise = Promise.reject(errorMessage);
        Product.find.mockReturnValue(rejectedPromise)
        await getProducts(req, res, next);
        expect(next).toBeCalledWith(errorMessage)
    })

    describe('Product Controller GetById', () => {
        it('should have a getProductById', () => {
            expect(typeof getProductById).toBe('function')
        })

        it('should call ProductModel.finById', async () => {
            req.params.productId = productId
            await getProductById(req,res,next);
            expect(Product.findById).toHaveBeenCalledWith(productId)
        })

        it("should return json body and reponse code 200", async () => {
            Product.findById.mockReturnValue(newProduct);
            await getProductById(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toStrictEqual(newProduct)
            expect(res._isEndCalled()).toBeTruthy();
        })

        it("should return 404 when item doesnt exist", async () => {
            Product.findById.mockReturnValue(null);
            await getProductById(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        })

        it('should handle errors when finding product by id', async () => {
            const errorMessage = { message: 'error'};
            const rejectedPromise = Promise.reject(errorMessage);
            Product.findById.mockReturnValue(rejectedPromise)
            await getProductById(req, res, next);
            expect(next).toBeCalledWith(errorMessage)
        })
    })

    describe('Product Controller Update', () => {
        it("should have an updateProduct function", () => {
            expect(typeof updateProduct).toBe("function")
        })

        it("should call productMode.findByIdAndUpdate", async () => {
            req.params.productId = productId
            req.body = updatedProduct
            await updateProduct(req, res, next);
            expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(productId, updatedProduct,{ new: true })
        })     
        
        it("should return json body and reponse code 200", async () => {
            Product.findByIdAndUpdate.mockReturnValue(newProduct);
            await updateProduct(req, res, next);
            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toStrictEqual(newProduct)
            expect(res._isEndCalled()).toBeTruthy();
        })

        it("should return 404 when item doesnt exist", async () => {
            Product.findByIdAndUpdate.mockReturnValue(null);
            await updateProduct(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        })

        it('should handle errors when updating product by id', async () => {
            const errorMessage = { message: "Error" };
            const rejectedPromise = Promise.reject(errorMessage);
            Product.findByIdAndUpdate.mockReturnValue(rejectedPromise)
            await updateProduct(req, res, next);
            expect(next).toBeCalledWith(errorMessage)
        })
    })

    describe('Product Controller Delete', () => {
        it("should have a deleteProduct function", () => {
            expect(typeof deleteProduct).toBe("function")
        })

        it("should call ProductModel.findByIdAndDelete", async () => {
            req.params.productId = productId;
            await deleteProduct(req, res, next)
            expect(Product.findByIdAndDelete).toBeCalledWith(productId)
        })

        it('should return 200 response', async () => {
            let deletedProduct = {
                name: "deletedProduct",
                description: "it is deleted"
            }
            Product.findByIdAndDelete.mockReturnValue(deletedProduct)
            await deleteProduct(req, res, next)
            expect(res.statusCode).toBe(200)
            expect(res._getJSONData()).toStrictEqual(deletedProduct)
            expect(res._isEndCalled()).toBeTruthy();        
        })

        it("should handle 404 when item doenst exist", async () => {
            Product.findByIdAndDelete.mockReturnValue(null);
            await deleteProduct(req, res, next);
            expect(res.statusCode).toBe(404);
            expect(res._isEndCalled()).toBeTruthy();
        })
    
        it("should handle errors", async () => {
            const errorMessage = { message: "Error deleting" }
            const rejectedPromise = Promise.reject(errorMessage)
            Product.findByIdAndDelete.mockReturnValue(rejectedPromise)
            await deleteProduct(req, res, next)
            expect(next).toHaveBeenCalledWith(errorMessage)
        })
    })
})

