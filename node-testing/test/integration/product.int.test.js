import request from 'supertest';
import app from '../../server'
import newProduct, { name as _name, description as _description } from '../data/new-product.json';

let firstProduct;

it('POST /api/products', async () => {
    const response = await request(app)
                            .post("/api/products")
                            .send(newProduct)
    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe(_name);
    expect(response.body.description).toBe(_description)
})

it('POST /api/products', async () => {
    const response = await request(app)
                            .post("/api/products")
                            .send({ name: 'phone'})
    expect(response.statusCode).toBe(500)
    expect(response.body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." })
})

it('GET /api/products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0]
})

it('GET /api/products/:productid', async () => {
    const response = await request(app).get('/api/products/' + firstProduct._id);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description)
})

it("GET id doenst exist /api/products/:productId", async () => {
    const response = await request(app).get('/api/products/5f5cb1f145b82ecaf43e3877')
    expect(response.statusCode).toBe(404);
})

it('PUT /api/products/:productId', async () => {
    const response = await request(app)
                                .put("/api/products/" + firstProduct._id)
                                .send({ name: "updated name", description: "updated desription" });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('updated name');
    expect(response.body.description).toBe('updated desription')
})

it("PUT return 404 when fail to update", async () => {
    const response = await request(app)
                                .put('/api/products/5f5cb1f145b82ecaf43e3877')
                                .send({ name: "updated name", description: "updated desription" });
    expect(response.statusCode).toBe(404);
})

it('DELETE /api/products', async () => {
    const response = await request(app)
                                .delete("/api/products/" + firstProduct._id)
                                .send()
    expect(response.statusCode).toBe(200)
})

it("DELETE id doenst exist /api/products/:productId", async () => {
    const response = await request(app)
                                    .delete("/api/products/" + firstProduct._id)
                                    .send();
    expect(response.statusCode).toBe(404)
})