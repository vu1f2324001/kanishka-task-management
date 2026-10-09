const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Clear existing tasks and users safely
  await knex('tasks').del();
  await knex('users').del();

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
  const adminPasswordHash = await bcrypt.hash('AdminPass123!', saltRounds);
  const userPasswordHash = await bcrypt.hash('UserPass123!', saltRounds);

  await knex('users').insert([
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPasswordHash,
      role: 'admin'
    },
    {
      name: 'Regular User',
      email: 'user@example.com',
      password: userPasswordHash,
      role: 'user'
    }
  ]);
};
