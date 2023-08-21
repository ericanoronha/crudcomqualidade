import { NextApiRequest, NextApiResponse } from "next";
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const todoId = request.query.id;
  response.end(`Post: ${todoId}`);
}
