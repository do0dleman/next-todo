import { NextResponse } from 'next/server'
import { db } from '~/server/db'
import { OnUserCreateModel } from './model'

async function handler(req: Request) {
    const json = await req.json() as OnUserCreateModel
    const userId = json.data.id

    db.todoFolder.create({
        data: {
            name: 'My Day',
            userId: userId
        }
    }).then((todoFolder) => {
        void db.todo.create({
            data: {
                body: 'Click to complete',
                userId: userId,
                todoFolderId: todoFolder.id
            }
        })
        void db.todo.create({
            data: {
                body: 'Or click to uncomplete',
                userId: userId,
                todoFolderId: todoFolder.id
            }
        })

    }).catch(e => {
        console.error(e)
        return NextResponse.json({ error: 'DB error' }, { status: 500 })
    })

    return NextResponse.json({ message: 'done' })
}

export { handler as POST }