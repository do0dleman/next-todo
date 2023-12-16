import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const todoFolderRouter = createTRPCRouter({
    getUserFolders: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input, ctx }) => {
            const folders = await ctx.db.todoFolder.findMany({
                where: {
                    userId: input.userId
                }
            })

            return {
                folders: folders
            }
        }),
    updateFolder: publicProcedure
        .input(z.object({
            id: z.number(),
            name: z.string().max(32, 'Folder name can contain only up to 32 characters! Try shorten it up.')
        }))
        .mutation(async ({ input, ctx }) => {
            return await ctx.db.todoFolder.update({
                where: {
                    id: input.id
                },
                data: {
                    name: input.name
                }
            });
        })
})