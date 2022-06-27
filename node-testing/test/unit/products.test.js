import productController from '../../controller/products.js'
import ProductModel from '../../models/ProductModel'
import httpMocks from 'node-mocks-http';
import newProduct from '../data'

describe('Product controller create', () => {
    beforeEach(() => {
        req.body = newProduct;
    })

    it('should have a createProduct function', () => {
        expect(typeof productController.createProduct).toBe('function')
    })
})