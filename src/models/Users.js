const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'O email é obrigatório.'],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Por favor, use um formato de email válido.']
  },
  password: {
    type: String,
    required: [true, 'A senha é obrigatória.'],
    select: false // Não retorna senha em consultas por padrão
  }
});

// Criptografa senha antes de salvar
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', userSchema);
