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

    createTodo: publicProcedure
        .input(z.object({
            userId: z.string(),
            body: z.string()
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.todo.create({
                data: {
                    body: input.body,
                    userId: input.userId
                }
            });
        }),

    updateTodo: publicProcedure
        .input(z.object({
            id: z.number(),
            isAcitve: z.boolean(),
            body: z.string()
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    isActive: input.isAcitve,
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
