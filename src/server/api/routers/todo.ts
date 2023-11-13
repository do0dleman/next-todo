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

    updateTodo: publicProcedure
        .input(z.object({
            id: z.number(),
            isAciteve: z.boolean()
        }))
        .mutation(async ({ ctx, input }) => {

            return ctx.db.todo.update({
                where: {
                    id: input.id
                },
                data: {
                    isActive: input.isAciteve
                }
            });
        }),

});
