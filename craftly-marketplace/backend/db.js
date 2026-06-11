const { createClient } = require('@libsql/client');

const client = createClient({
  url: process.env.TEAM_DB_URL || 'file:local.db',
  authToken: process.env.TEAM_DB_AUTH_TOKEN,
});

async function query(sql, params = []) {
  try {
    const result = await client.execute({
      sql: sql,
      args: params
    });
    // Convert rows to the format expected by the app (array of objects)
    return result.rows;
  } catch (error) {
    console.error('DB Error:', error.message);
    throw error;
  }
}

module.exports = { query };
