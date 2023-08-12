/* eslint-disable no-console */
interface TodoRepositoryGetInputParams {
  page: number;
  limit: number;
}
interface TodoRepositoryGetOutputParams {
  todos: Todo[];
  total: number;
  pages: number;
}

function get({
  page,
  limit,
}: TodoRepositoryGetInputParams): Promise<TodoRepositoryGetOutputParams> {
  return fetch("/api/todos").then(async (respostaDoServidor) => {
    const todosString = await respostaDoServidor.text();
    const todosFromServer = JSON.parse(todosString).todos as Todo[];
    const ALL_TODOS = todosFromServer;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTodos = ALL_TODOS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_TODOS.length / limit);
    console.log({ todos: ALL_TODOS, total: ALL_TODOS.length, pages: 1 });

    //return { todos: ALL_TODOS, total: ALL_TODOS.length, pages: 1 };
    return {
      todos: paginatedTodos,
      total: ALL_TODOS.length,
      pages: totalPages,
    };
  });
}

export const todoRepository = { get };

interface Todo {
  id: string;
  date: string;
  content: Date;
  done: boolean;
}
