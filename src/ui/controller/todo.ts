import { todoRepository } from "@ui/repository/todo";

interface TodoControllerGetParams {
  page?: number;
}

async function get({ page }: TodoControllerGetParams = {}) {
  return todoRepository.get({ page: page || 1, limit: 1 });
}

export const todoController = {
  get,
};
