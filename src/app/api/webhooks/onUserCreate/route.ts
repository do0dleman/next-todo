import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { OnUserCreateModel } from './model'

async function handler(req: Request) {
    const json = await req.json() as OnUserCreateModel
    const userId = json.data.id
    const res = NextResponse

    db.todoFolder.create({
        data: {
            name: 'My Day',
            userId: userId
        }
    }).then(async (todoFolder) => {
        await db.todo.createMany({
            data: [{
                body: 'Click to complete',
                userId: userId,
                todoFolderId: todoFolder.id
            }, {
                body: 'Or to uncomplete',
                userId: userId,
                todoFolderId: todoFolder.id,
                isActive: false
            },]
        })
        res.json({ folderId: todoFolder.id })

    }).catch(e => {
        console.error(e)
        res.json({ error: 'DB error' }, { status: 500 })
    })

    return res
}

export { handler as POST }