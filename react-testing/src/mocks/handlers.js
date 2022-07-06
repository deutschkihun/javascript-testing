import { rest } from "msw";

const todos = ["먹기", "자기", "놀기"];

export const handlers = [

  // fake backend server -> getting todos
  rest.get("/todos", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todos));
  }),

  // fake backend server -> posting new todo
  rest.post("/todos", (req, res, ctx) => {
    todos.push(req.body);
    return res(ctx.status(201));
  })
];
