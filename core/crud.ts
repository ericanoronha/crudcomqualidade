import fs from 'fs';
import { v4 as uuid } from 'uuid';
const DB_FILE_PATH = './core/db';

console.log('[CRUD]');

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todos: Array<Todo> = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
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

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, '');
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify({ todos }, null, 2));
  if (!updatedTodo) {
    throw new Error('Please provide a valid ID');
  }
  return updatedTodo;
}

function updateContentById(id: string, content: string): Todo {
  return update(id, { content });
}

// Simulação
CLEAR_DB();
create('Primeira TO-DO');
create('Segunda TO-DO');
const terceiraTodo = create('Terceira TODO');
update(terceiraTodo.id, { content: 'Conteúdo novo' });
updateContentById(terceiraTodo.id, 'TODO atualizada!');
//update(terceiraTodo.id + 5, { done: true });
console.log(read());
