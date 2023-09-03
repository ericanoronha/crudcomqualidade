import { NextApiRequest, NextApiResponse } from "next";
import { z as schema } from "zod";
import { todoRepository } from "@server/repository/todo";
import { HttpNotFoundError } from "@server/infra/errors";

async function get(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
  };
  const page = Number(query.page);
  const limit = Number(query.limit);

  if (query.page && isNaN(page)) {
    // res.status(400).json({
    //   error: {
    //     message: "`page` must be a number",
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: "`page` must be a number",
        },
      }),
      {
        status: 400,
      }
    );
  }
  if (query.limit && isNaN(limit)) {
    // res.status(400).json({
    //   error: {
    //     message: "`limit` must be a number",
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: "`limit` must be a number",
        },
      }),
      {
        status: 400,
      }
    );
  }

  const output = await todoRepository.get({
    page,
    limit,
  });

  // res.status(200).json({
  //   total: output.total,
  //   pages: output.pages,
  //   todos: output.todos,
  // });
  return new Response(
    JSON.stringify({
      total: output.total,
      pages: output.pages,
      todos: output.todos,
    }),
    {
      status: 200,
    }
  );
}

const TodoCreateBodySchema = schema.object({
  content: schema.string(),
});

async function create(req: Request) {
  const body = TodoCreateBodySchema.safeParse(await req.body);
  if (!body.success) {
    // res.status(400).json({
    //   error: {
    //     message: "You need to provide a content to create a TODO",
    //     description: body.error.issues,
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: "You need to provide a content to create a TODO",
          description: body.error.issues,
        },
      }),
      {
        status: 400,
      }
    );
  }
  try {
    const createdTodo = await todoRepository.createByContent(body.data.content);

    // res.status(201).json({
    //   todo: createdTodo,
    // });
    return new Response(
      JSON.stringify({
        todo: createdTodo,
      }),
      {
        status: 201,
      }
    );
  } catch {
    // res.status(400).json({
    //   error: {
    //     message: "Failed to create todo",
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: "Failed to create todo",
        },
      }),
      {
        status: 400,
      }
    );
  }
}

async function toggleDone(req: NextApiRequest, res: NextApiResponse) {
  const todoId = req.query.id;

  if (!todoId || typeof todoId !== "string") {
    // res.status(400).json({
    //   error: {
    //     message: "You must to provide a string ID",
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: "You must to provide a string ID",
        },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const updatedTodo = await todoRepository.toggleDone(todoId);
    // res.status(200).json({
    //   todo: updatedTodo,
    // });
    return new Response(
      JSON.stringify({
        todo: updatedTodo,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    if (err instanceof Error) {
      // res.status(404).json({
      //   error: {
      //     message: err.message,
      //   },
      // });
      return new Response(
        JSON.stringify({
          error: {
            message: err.message,
          },
        }),
        {
          status: 404,
        }
      );
    }
  }
}

async function deleteById(req: NextApiRequest, res: NextApiResponse) {
  const QuerySchema = schema.object({
    id: schema.string().uuid().nonempty(),
  });

  const parsedQuery = QuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    // res.status(400).json({
    //   error: {
    //     message: `You must to provide a valid id`,
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: `You must to provide a valid id`,
        },
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const todoId = parsedQuery.data.id;
    await todoRepository.deleteById(todoId);
    // res.status(204).end();
    return new Response(end(), {
      status: 204,
    });
  } catch (err) {
    if (err instanceof HttpNotFoundError) {
      // return res.status(err.status).json({
      //   error: {
      //     message: err.message,
      //   },
      // });
      return new Response(
        JSON.stringify({
          error: {
            message: err.message,
          },
        }),
        {
          status: err.status,
        }
      );
    }

    // res.status(500).json({
    //   error: {
    //     message: `Internal server error`,
    //   },
    // });
    return new Response(
      JSON.stringify({
        error: {
          message: `Internal server error`,
        },
      }),
      {
        status: 500,
      }
    );
  }
}

export const todoController = {
  get,
  create,
  toggleDone,
  deleteById,
};
