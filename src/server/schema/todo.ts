import { z as schema } from "zod";

export const TodoSchema = schema.object({
  id: schema.string().uuid(),
  content: schema.string().nonempty(),
  date: schema.string(),
  done: schema.boolean(),
  /*
  se done estiver como string no db, pode converter assim:
  done: schema.string().transform((done)=>{
    if (done === "true") {
    return true;
    }
    return false;
  })
  */
});

export type Todo = schema.infer<typeof TodoSchema>;
