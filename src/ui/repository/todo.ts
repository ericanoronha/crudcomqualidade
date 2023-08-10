interface TodoRepositoryGetParams {
  page: number;
}
interface TodoRepositoryGetOutput {
  todos: Todo[];
}

function get({ page }: TodoRepositoryGetParams): TodoRepositoryGetOutput {
  fetch("/api/todos").then(async (respostaDoServidor) => {
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
