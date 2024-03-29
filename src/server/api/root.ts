import { createTRPCRouter } from "~/server/api/trpc";
import { todoRouter } from "./routers/todo";
import { todoFolderRouter } from "./routers/todoFolder";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  todo: todoRouter,
  todoFolder: todoFolderRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
