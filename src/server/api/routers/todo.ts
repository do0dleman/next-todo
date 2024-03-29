import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
    getUserTodos: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            const todos = await ctx.db.todo.findMany({
                where: {
                    userId: input.userId
                }
            })
            return {
                todos: todos
            };
        }),
    getFolderTodos: publicProcedure
        .input(z.object({ folderId: z.number() }))
        .query(async ({ input, ctx }) => {
            const todos = await ctx.db.todo.findMany({
                where: {
                    todoFolderId: input.folderId
                }
            })
            return {
                todos: todos
            };
        }),

    createTodo: publicProcedure
        .input(z.object({
            userId: z.string(),
            todoFolderId: z.number(),
            body: z.string().max(256, "Todo can contain only up to 256 characters! Try shorten it up.")
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.todo.create({
                data: {
                    body: input.body,
                    todoFolderId: input.todoFolderId,
                    userId: input.userId,
                }
            });
        }),

    updateTodo: publicProcedure
        .input(z.object({
            id: z.number(),
            isActive: z.boolean(),
            body: z.string().max(256, "Todo can contain only up to 256 characters! Try shorten it up.")
        }))
        .mutation(async ({ ctx, input }) => {

            return await ctx.db.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    isActive: input.isActive,
                    body: input.body,
                }
            });
        }),

    deleteTodo: publicProcedure
        .input(z.object({
            id: z.number(),
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.todo.delete({
                where: {
                    id: input.id
                }
            });
        }),
});
