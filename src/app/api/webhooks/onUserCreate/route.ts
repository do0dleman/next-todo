import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { OnUserCreateModel } from './model'

async function handler(req: Request) {
    const json = await req.json() as OnUserCreateModel
    const userId = json.data.id

    const todoFolderId: number | undefined | void = await db.todoFolder.create({
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
            },
            ]
        })
        return todoFolderId
    }).catch(e => {
        console.error(e)
    })

    if (todoFolderId !== undefined) {
        return NextResponse.json({ message: `Succesfully created folder with id ${todoFolderId}` })
    }
    return NextResponse.json({ error: 'DB error, failder to create todoFolder' }, { status: 500 })
}

export { handler as POST }