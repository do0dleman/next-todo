"use client";

import { HashLoader } from "react-spinners";
import CreateTodo from "./components/CreateTodo";
import Todo from "./components/todo/Todo"
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

    if (!todos) return <div className="flex items-center justify-center h-screen">
        <HashLoader color="#fff" size={100} />
    </div>

    return (
        <>
            <main className="flex flex-col justify-center children:px-8 mt-20">
                <div className="mb-20 px-0">
                    {todos?.map((todo) => <Todo todoObject={todo} key={todo.id} />)}
                    {((todos.length === 0) && isLoaded) &&
                        <div className="container mx-auto text-center text-xl mt-4">
                            {`No todos where found for user ${user ? user.username : ''}`}
                        </div>}
                </div>
                <CreateTodo refetch={refetch} />
            </main>
        </>
    )
}
export default Todos