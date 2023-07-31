//const fs = require('fs'); // CommonJS
import fs from 'fs'; // ES6
const DB_FILE_PATH = './core/db';

console.log('[CRUD]');

function create(content: string) {
  const todo = {
    content: content,
  };
  // salvar content no sistema
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(todo));
  return content;
}

function read() {
  const db = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  return db;
}

// [SIMULATION]
create('Primeira TO-DO');
console.log(read());
