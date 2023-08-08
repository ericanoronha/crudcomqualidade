/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from "next";
import { read } from "core/crud";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request.method);
  if (request.method === "GET") {
    const ALL_TODOS = read();
    response.status(200).json({ todos: ALL_TODOS });
    return;
  }
  response.status(405).json({ message: "Method not allowed" });
}
