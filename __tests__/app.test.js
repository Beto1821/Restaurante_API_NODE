const request = require('supertest');
const app = require('../src/app');

describe('App Root', () => {
    it('deve retornar status 200 na rota raiz', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('API do Restaurante está no ar!');
    });
});
