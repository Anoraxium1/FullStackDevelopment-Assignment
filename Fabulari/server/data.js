const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'data', 'data.json');

function loadDb() {
  if (!fs.existsSync(DB_PATH)) {
    return { users: [], groups: [], rooms: [] };
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function saveDb(db) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

module.exports = { loadDb, saveDb };
