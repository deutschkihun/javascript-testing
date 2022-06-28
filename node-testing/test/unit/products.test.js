import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../../controller/products';
import {create} from '../../models/Product.js';
import httpMocks from 'node-mocks-http';
import newProduct from '../data/new-product.json'

create = jest.fn();

// https://medium.com/@chris.marshall/mocking-read-only-functions-which-return-functions-in-jest-enzyme-4d2f2a97c168

let req,res,next;
beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

describe('Product controller create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })
    it('should have a createProduct funtcion', () => {
        expect(typeof createProduct).toBe("function")
    })

    it("should call ProductModel.create", async () => {
        await createProduct(req, res, next);
        expect(create).toBeCalledWith(newProduct);
    })
})