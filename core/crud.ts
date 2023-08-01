import fs from 'fs';
const DB_FILE_PATH = './core/db';

console.log('[CRUD]');

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos = [todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return content;
}

function read() {
  const db = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  return db;
}

// [SIMULATION]
create('Primeira TO-DO');
console.log(read());
