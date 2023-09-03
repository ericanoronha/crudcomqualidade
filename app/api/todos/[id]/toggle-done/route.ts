import { todoController } from "@server/controller/todo";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return todoController.toggleDone(request, params.id);
}
