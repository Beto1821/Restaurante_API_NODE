const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/Users');

/* Conecta ao banco de dados de teste antes de todos os testes. */
beforeAll(async () => {
  // Usa uma variável de ambiente para o banco de teste, se disponível, ou um banco local.
  const url = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/restaurante_test_db';
  await mongoose.connect(url);
});

/* Limpa a coleção de usuários antes de cada teste para garantir independência. */
beforeEach(async () => {
  await User.deleteMany();
});

/* Desconecta do banco de dados após todos os testes. */
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
      .post('/auth/register')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso!');
  });

  it('deve falhar ao registrar um usuário com um email já existente', async () => {
    // Primeiro, registra o usuário
    await request(app).post('/auth/register').send(testUser);

    // Depois, tenta registrar novamente com o mesmo email
    const response = await request(app)
      .post('/auth/register')
      .send(testUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Este email já está em uso.');
  });

  it('deve fazer login com credenciais corretas e retornar um token', async () => {
    // Registra o usuário primeiro
    await request(app).post('/auth/register').send(testUser);

    const response = await request(app)
      .post('/auth/login')
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.token).toBeDefined();
  });

  it('deve falhar ao fazer login com uma senha incorreta', async () => {
    await request(app).post('/auth/register').send(testUser);

    const response = await request(app)
      .post('/auth/login')
      .send({ email: testUser.email, password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Email ou senha inválidos.');
  });
});

