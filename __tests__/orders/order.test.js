const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const User = require('../../src/models/Users');
const Order = require('../../src/models/Order');

beforeAll(async () => {
    const url = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/restaurante_test_db';
    await mongoose.connect(url);
});

beforeEach(async () => {
    await User.deleteMany();
    await Order.deleteMany();
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Rotas de Pedidos (Orders)', () => {
    let token;
    const testUser = {
        email: 'testorder@example.com',
        password: 'password123',
    };

    const testOrder = {
        numeroPedido: '12345',
        dataCriacao: new Date().toISOString(),
        itens: [
            {
                idItem: 'prod1',
                quantidadeItem: 2,
                valorItem: 10.50
            },
            {
                idItem: 'prod2',
                quantidadeItem: 1,
                valorItem: 20.00
            }
        ]
    };

    beforeEach(async () => {
        await request(app).post('/auth/register').send(testUser);
        const res = await request(app).post('/auth/login').send(testUser);
        token = res.body.token;
    });

    describe('Autenticação (Middleware)', () => {
        it('deve negar acesso sem token', async () => {
            const response = await request(app).get('/order');
            expect(response.status).toBe(401);
        });

        it('deve negar acesso com token inválido', async () => {
            const response = await request(app)
                .get('/order')
                .set('Authorization', 'Bearer invalidtoken');
            expect(response.status).toBe(401); // ou 500 dependendo de como o jwt.verify lança erro, mas o middleware trata
        });
    });

    describe('CRUD de Pedidos', () => {
        it('deve criar um novo pedido com sucesso', async () => {
            const response = await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);

            expect(response.status).toBe(201);
            expect(response.body.order).toHaveProperty('numeroPedido', testOrder.numeroPedido);
            expect(response.body.order.items).toHaveLength(2);
        });

        it('deve listar todos os pedidos', async () => {
            await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);

            const response = await request(app)
                .get('/order')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });

        it('deve buscar um pedido pelo ID (numeroPedido)', async () => {
            await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);

            const response = await request(app)
                .get(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('numeroPedido', testOrder.numeroPedido);
        });

        it('deve retornar 404 ao buscar pedido inexistente', async () => {
            const response = await request(app)
                .get('/order/99999')
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(404);
        });

        it('deve atualizar um pedido existente', async () => {
            await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);

            const updatedData = {
                ...testOrder,
                itens: [
                    {
                        idItem: 'prod1',
                        quantidadeItem: 5,
                        valorItem: 10.50
                    }
                ]
            };

            const response = await request(app)
                .put(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedData);

            expect(response.status).toBe(200);
            expect(response.body.order.items[0].quantidadeItem).toBe(5);
        });

        it('deve deletar um pedido', async () => {
            await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);

            const response = await request(app)
                .delete(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`);

            expect(response.status).toBe(200);

            const getResponse = await request(app)
                .get(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`);

            expect(getResponse.status).toBe(404);
        });
    });

    describe('Cobertura de Erros e Validação', () => {
        it('deve retornar 400 ao tentar criar pedido com dados inválidos (sem itens)', async () => {
            const invalidOrder = { ...testOrder, itens: [] };
            const response = await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidOrder);
            expect(response.status).toBe(400);
        });

        it('deve retornar 400 ao tentar atualizar com dados inválidos', async () => {
            const invalidOrder = { ...testOrder, itens: [] };
            const response = await request(app)
                .put(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`)
                .send(invalidOrder);
            expect(response.status).toBe(400);
        });

        it('deve retornar 500 se houver erro no banco ao listar pedidos', async () => {
            jest.spyOn(Order, 'find').mockImplementationOnce(() => {
                throw new Error('Erro de banco simulado');
            });
            const response = await request(app)
                .get('/order')
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        });

        it('deve retornar 500 se houver erro no banco ao buscar pedido por ID', async () => {
            jest.spyOn(Order, 'findOne').mockImplementationOnce(() => {
                throw new Error('Erro de banco simulado');
            });
            const response = await request(app)
                .get(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        });

        it('deve retornar 400 se houver erro ao criar pedido (ex: erro de validação do mongoose)', async () => {
            jest.spyOn(Order.prototype, 'save').mockImplementationOnce(() => {
                throw new Error('Erro de validação simulado');
            });
            const response = await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);
            expect(response.status).toBe(400);
        });

        it('deve retornar 400 se houver erro ao atualizar pedido', async () => {
            jest.spyOn(Order, 'findOneAndUpdate').mockImplementationOnce(() => {
                throw new Error('Erro de atualização simulado');
            });
            const response = await request(app)
                .put(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`)
                .send(testOrder);
            expect(response.status).toBe(400);
        });

        it('deve retornar 500 se houver erro ao deletar pedido', async () => {
            jest.spyOn(Order, 'findOneAndDelete').mockImplementationOnce(() => {
                throw new Error('Erro de deleção simulado');
            });
            const response = await request(app)
                .delete(`/order/${testOrder.numeroPedido}`)
                .set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(500);
        });
        it('deve retornar 400 se numeroPedido for inválido', async () => {
            const invalidOrder = { ...testOrder, numeroPedido: '' };
            const response = await request(app)
                .post('/order')
                .set('Authorization', `Bearer ${token}`)
                .send(invalidOrder);
            expect(response.status).toBe(400);
            expect(response.body.message).toMatch(/numeroPedido/);
        });
    });
});
