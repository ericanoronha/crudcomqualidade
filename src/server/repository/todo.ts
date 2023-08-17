import { read, create, update } from "@db-crud-todo";

interface TodoRepositoryGetParams {
  page?: number;
  limit?: number;
}

interface TodoRepositoryGetOutput {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams = {}): TodoRepositoryGetOutput {
  const currentPage = page || 1;
  const currentLimit = limit || 10;
  const ALL_TODOS = read().reverse();

  const startIndex = (currentPage - 1) * currentLimit;
  const endIndex = currentPage * currentLimit;
  const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
  const totalPages = Math.ceil(ALL_TODOS.length / currentLimit);

  return {
    todos: paginatedTodos,
    total: ALL_TODOS.length,
    pages: totalPages,
  };
}

async function createByContent(content: string): Promise<Todo> {
  const newTodo = create(content);
  return newTodo;
}

async function toggleDone(id: string): Promise<Todo> {
  const currentStatus = false;
  const ALL_TODOS = read();
  const todo = ALL_TODOS.find((todo) => todo.id === id);
  if (!todo) throw new Error(`Todo ${id} not found`);

  const updatedTodo = update(todo.id, {
    done: !currentStatus,
  });
  return updatedTodo;
}

export const todoRepository = {
  get,
  createByContent,
  toggleDone,
};

// Model/Schema
interface Todo {
  id: string;
  content: string;
  date: string;
  done: boolean;
}
