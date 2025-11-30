
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app'); // <--- Aponta para o app.js correto
const User = require('../../src/models/Users');

beforeAll(async () => {
  const url = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/restaurante_test_db';
  await mongoose.connect(url);
});

beforeEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Rotas de Autenticação', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'password123',
  };

  it('deve registrar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/auth/register') // Certifique-se que essa rota existe no seu server.js
      .send(testUser);

    // Ajuste o status conforme o retorno real da sua API (201 criado ou 200 ok)
    expect(response.status).toBe(201);
    // Opcional: checar mensagem apenas se sua API retorna exatamente isso
    // expect(response.body.message).toBe('Usuário registrado com sucesso!');
  });

  it('deve falhar ao registrar um usuário com um email já existente', async () => {
    // 1. Cria o usuário pela primeira vez
    await request(app).post('/auth/register').send(testUser);

    // 2. Tenta criar de novo
    const response = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(response.status).toBe(400); // Ou 409 (Conflict), dependendo da sua API
    // expect(response.body.message).toBe('Este email já está em uso.');
  });

  it('deve fazer login com credenciais corretas e retornar um token', async () => {
    // Cria o usuário para poder logar
    await request(app).post('/auth/register').send(testUser);

    const response = await request(app)
      .post('/auth/login')
      .send(testUser);

    expect(response.status).toBe(200);
    // Verifica se retornou algo que parece um token
    expect(response.body).toHaveProperty('token');
  });

  it('deve falhar ao fazer login com uma senha incorreta', async () => {
    await request(app).post('/auth/register').send(testUser);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(response.status).toBe(401); // Unauthorized
  });

  it('deve falhar ao acessar rota protegida se o usuário foi deletado', async () => {
    await request(app).post('/auth/register').send(testUser);
    const loginRes = await request(app).post('/auth/login').send(testUser);
    const token = loginRes.body.token;

    await User.deleteOne({ email: testUser.email });

    const response = await request(app)
      .get('/order')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/usuário dono deste token não existe/i);
  });
});