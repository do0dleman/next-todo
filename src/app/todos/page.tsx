"use client";

import Header from "../_components/Header"
import Todo from "./components/Todo"
import { useUser } from "@clerk/nextjs"
import { api } from "~/trpc/react";

function Todos() {

    const { user } = useUser()

    const { data } = api.todo.getUserTodos.useQuery({
        userId: user ? user.id : ''
    }, {
        enabled: !!user?.id
    })

    const todos = data ? data!.todos : []

    return (
        <>
            <Header />
            <main className="container mx-auto flex flex-col">
                {todos && todos.map(todo => <Todo todoObject={todo} key={todo.id} />)}
                {(todos.length === 0) && <p>{`No todos where found for user ${user ? user.username : ''
                    }`}</p>}
            </main>
        </>
    )
}
export default Todos