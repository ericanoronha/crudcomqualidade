/* eslint-disable no-console */
import fs from "fs";
import { v4 as uuid } from "uuid";
const DB_FILE_PATH = "./core/db";

type UUID = string;

interface Todo {
  id: UUID;
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

export function read(): Array<Todo> {
  //carrega como string
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  //converte para objeto
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    // fail fast
    return [];
  }
  return db.todos;
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
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
    throw new Error("Please provide a valid ID");
  }
  return updatedTodo;
}

function updateContentById(id: UUID, content: string): Todo {
  return update(id, { content });
}

function deleteById(id: UUID) {
  const all = read();
  const allExceptOne = all.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });
  console.log("allExceptOne ", allExceptOne);

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify({ todos: allExceptOne }, null, 2)
  );
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// Simulação
// CLEAR_DB();
// create("Primeira TO-DO");
// const secondTodo = create("Segunda TO-DO");
// deleteById(secondTodo.id);
// const thirdTodo = create("Terceira TODO");
// updateContentById(thirdTodo.id, "Terceira TODO está atualizada!");
// const todos = read();
// console.log(todos);
// console.log(todos.length);
