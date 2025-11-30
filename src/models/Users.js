const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true, // Garante que não haverá dois usuários com o mesmo email
    lowercase: true, // Salva o email sempre em minúsculas para consistência
    match: [/\S+@\S+\.\S+/, 'Por favor, use um formato de email válido.']
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    select: false // Impede que o campo de senha seja retornado em queries por padrão
  }
});

// Middleware (hook) do Mongoose que é executado ANTES de um usuário ser salvo
userSchema.pre('save', async function() {
  // Executa o código apenas se a senha foi modificada (ou é um novo usuário)
  if (!this.isModified('password')) {
    return;
  }

  // Gera o "salt" e criptografa a senha com um custo de 12 (padrão seguro)
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
