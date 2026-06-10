const { execSync } = require('child_process');

function query(sql) {
  try {
    // Escape single quotes for shell and wrap in double quotes for team-db
    // Replace " with \" for the shell command
    const safeSql = sql.replace(/"/g, '\\"');
    const output = execSync(`team-db "${safeSql}"`, { encoding: 'utf-8' });
    return JSON.parse(output);
  } catch (error) {
    console.error('DB Error:', error.message);
    throw error;
  }
}

module.exports = { query };
