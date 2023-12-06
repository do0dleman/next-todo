"use client";

import CreateTodo from "./components/CreateTodo";
import Todo from "./components/Todo"
import { useUser } from "@clerk/nextjs"
import { api } from "~/trpc/react";

function Todos() {
    const { user, isLoaded } = useUser()

    const { data, refetch } = api.todo.getUserTodos.useQuery({
        userId: user ? user.id : ''
    }, {
        enabled: !!user?.id
    })

    const todos = data?.todos

    if (!todos) return <div>Loading...</div>

    return (
        <>
            <main className="flex flex-col justify-center children:px-8 mt-20">
                <div className="mb-20 px-0">
                    {todos?.map(todo => <Todo todoObject={todo} key={todo.id} />)}
                    {((todos.length === 0) && isLoaded) && <p>{`No todos where found for user ${user ? user.username : ''
                        }`}</p>}
                </div>
                <CreateTodo refetch={refetch} />
            </main>
        </>
    )
}
export default Todos