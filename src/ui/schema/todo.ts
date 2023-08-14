import { z as schema } from "zod";

// model/schema
// interface Todo {
//   id: string;
//   content: string;
//   date: Date;
//   done: boolean;
// }
export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string(),
  date: schema.string().datetime(),
  done: schema.boolean(),
});

export type Todo = schema.infer<typeof TodoSchema>;
