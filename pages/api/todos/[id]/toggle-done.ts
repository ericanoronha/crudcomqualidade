import { todoController } from "@server/controller/todo";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  //response.status(200).json({ message: "Toggle done!" });
  todoController.toggleDone(request, response);
}
