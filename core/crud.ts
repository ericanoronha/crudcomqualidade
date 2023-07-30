//const fs = require('fs'); // CommonJS
import fs from 'fs'; // ES6
const DB_FILE_PATH = './core/db';

console.log('[CRUD]');

function create(content: string) {
  // salvar content no sistema
  fs.writeFileSync(DB_FILE_PATH, content);
  return content;
}

// [SIMULATION]
console.log(create('Teste!'));
