import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page: number;
}

async function get(params: TodoControllerGetParams) {
  return todoRepository.get({ page: params.page, limit: 2 });
}

function filterTodosByContent<Todo>(
  search: string,
  todos: Array<Todo & { content: string }>
): Array<Todo> {
  const homeTodos = todos.filter((todo) => {
    const searchNormalized = search.toLowerCase();
    const contentNormalized = todo.content.toLowerCase();
    return contentNormalized.includes(searchNormalized);
  });
  return homeTodos;
}

interface TodoControllerCreateParams {
  content?: string;
  onError: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (todo: any) => void;
}

function create({ content, onSuccess, onError }: TodoControllerCreateParams) {
  // fail fast
  if (!content) {
    onError();
    return;
  }

  // o que virá do repository
  const todo = {
    id: "12345",
    content,
    date: new Date(),
    done: false,
  };
  onSuccess(todo);
}

export const todoController = {
  get,
  filterTodosByContent,
  create,
};
