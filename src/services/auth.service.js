const bcrypt = require('bcrypt');
const db = require('../config/database');
const { signToken } = require('../utils/jwt');

class AuthService {
  static async register({ name, email, password }) {
    const existing = await db('users').where({ email }).first();
    if (existing) {
      const error = new Error('Email is already registered');
      error.statusCode = 409;
      throw error;
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [insertedId] = await db('users').insert({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const user = await db('users').select('id', 'name', 'email', 'role', 'created_at').where({ id: insertedId }).first();
    return user;
  }

  static async login({ email, password }) {
    const user = await db('users').where({ email }).first();
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }

  static async getProfile(userId) {
    const user = await db('users').select('id', 'name', 'email', 'role', 'created_at').where({ id: userId }).first();
    return user;
  }
}

module.exports = AuthService;
