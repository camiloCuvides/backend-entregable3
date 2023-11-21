const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies debe traer todas las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una pelicula', async () => {
    const movie = {
        name: "rapidos y furiosos",
        image: "http:/jbeijwbjdwb",
        synopsis: "hola",
        releaseYear: 2014,
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una pelicula', async() => {
    const movie = {
        name: "rapidos y super furiosos"
    };
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
 });

 test('POST /movies/:id/actors debe insertar los actores de las pelicula', async () => {
    const actor  = await Actor.create({
        firstName: "rapidos y furiosos",
        lastName: "hola",
        nationality: "hola",
        image: "http:/jfdiohdsi",
        birthday: "10-05-2000"
    })
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id])
    console.log(res)
    await actor.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors debe insertar los directores de las pelicula', async () => {
    const director  = await Director.create({
        firstName: "rapidos y furiosos",
        lastName: "hola",
        nationality: "hola",
        image: "http:/jfdiohdsi",
        birthday: "10-05-2000"
    })
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id])
    console.log(res)
    await director.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/genres debe insertar los generos de las pelicula', async () => {
    const genre  = await Genre.create({
        name: "Terror",
    })
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id])
    console.log(res)
    await genre.destroy();
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
});

 test('DELETE /movies/:id debe eliminar una pelicula', async () => { 
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
    
 });

 
