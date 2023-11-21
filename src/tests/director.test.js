const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors debe traer todos los actores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un actor', async () => {
    const director = {
        firstName: "camilo",
        lastName: "cuvides",
        nationality: "Colombia",
        image: "bkjdbjsbdlf",
        birthday: "10-05-2000",
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});

test('PUT /directors/:id debe actualizar un actor', async() => {
    const director = {
        firstName: "brayan"
    };
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
 });

 test('DELETE /directors/:id debe eliminar un actor', async () => { 
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
    
 });
