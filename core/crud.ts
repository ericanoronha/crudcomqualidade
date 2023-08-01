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

  const todos: Array<Todo> = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return content;
}

function read(): Array<Todo> {
  //carrega como string
  const dbString = fs.readFileSync(DB_FILE_PATH, 'utf-8');
  //converte para objeto
  const db = JSON.parse(dbString || '{}');
  if (!db.todos) {
    // fail fast
    return [];
  }
  return db.todos;
}

// [SIMULATION]
create('Segunda TO-DO');
console.log(read());
