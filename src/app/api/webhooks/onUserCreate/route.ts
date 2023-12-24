import { NextResponse } from 'next/server'
import { db } from '~/server/db'

export async function handler(req: Request) {
    const json = await req.json()
    const userId = json.data.id as string

    db.todoFolder.create({
        data: {
            name: 'My Day',
            userId: userId
        }
    }).then(async (todoFolder) => {
        await db.todo.create({
            data: {
                body: 'Click to complete',
                userId: userId,
                todoFolderId: todoFolder.id
            }
        })
        await db.todo.create({
            data: {
                body: 'Or click to uncomplete',
                userId: userId,
                todoFolderId: todoFolder.id
            }
        })

    })

    const res = NextResponse.json({ message: 'done' })
    return res
}

export { handler as POST }