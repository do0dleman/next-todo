"use client"

import Todo from "./Todo"
import { HashLoader } from "react-spinners"
import useTodoStore from "../../../todoStore"
import useTodoListStore from "../todoListStore"
import { useEffect, useState } from "react"


function TodoList() {
    const currentFolderId = useTodoStore(state => state.currentFolderId)
    const getActiveTodos = useTodoListStore(store => store.getActiveTodos)
    const getInactiveTodos = useTodoListStore(store => store.getInactiveTodos)

    const todos = useTodoListStore(store => store.todos)
    const [activeTodos, setActiveTodos] = useState(getActiveTodos())
    const [inactiveTodos, setInactiveTodos] = useState(getInactiveTodos())

    useEffect(() => {
        setActiveTodos(getActiveTodos())
        setInactiveTodos(getInactiveTodos())
    }, [todos])

    if (currentFolderId === undefined) return <div className="flex items-center justify-center h-full">
        <h2 className="text-2xl">Select a Folder</h2>
    </div>

    if (todos === undefined) {
        return <div className="flex items-center justify-center h-full">
            <HashLoader color="#fff" size={100} />
        </div>
    }

    return (
        <div className="px-8 h-[calc(100dvh-5rem-5rem)] overflow-y-scroll">
            {activeTodos.map((todo) => <Todo todoObject={todo} key={todo.id} />)}
            {(inactiveTodos.length !== 0) && <h2 className="text-inactive mt-2">Completed:</h2>}
            {inactiveTodos.map((todo) => <Todo todoObject={todo} key={todo.id} />)}
            {(todos.length === 0) &&
                <div className="container mx-auto text-center text-xl mt-4">
                    {`No todos here yet`}
                </div>}
        </div>
    )
}
export default TodoList