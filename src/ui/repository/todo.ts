interface TodoRepositoryGetInputParams {
  page: number;
}
interface TodoRepositoryGetOutputParams {
  todos: Todo[];
}

function get({
  page,
}: TodoRepositoryGetInputParams): Promise<TodoRepositoryGetOutputParams> {
  return fetch("/api/todos").then(async (respostaDoServidor) => {
    const todosString = await respostaDoServidor.text();
    const todosFromServer = JSON.parse(todosString).todos;
    return { todos: todosFromServer };
  });
}

export const todoRepository = { get };

interface Todo {
  id: string;
  date: string;
  content: Date;
  done: boolean;
}
