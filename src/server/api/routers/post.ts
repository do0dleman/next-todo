import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
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
