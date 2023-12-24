import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { OnUserCreateModel } from './model'

async function handler(req: Request) {
    const json = await req.json() as OnUserCreateModel
    const userId = json.data.id

    const userTodoFolder = await db.todoFolder.findFirst({
        where: {
            userId: userId
        }
    })

    if (userTodoFolder) {
        return NextResponse.json({ message: "User already has todos" })
    }

    const todoFolder = await db.todoFolder.create({
        data: {
            name: 'My Day',
            userId: userId
        }
    })

    if (todoFolder === undefined) {
        return NextResponse.json({ error: 'DB error, failder to create todoFolder' }, { status: 500 })
    }

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
    return NextResponse.json({ message: `Succesfully created folder with id ${todoFolder.id}` })
}

export { handler as POST }