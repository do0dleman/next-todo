"use client";
import { Todo } from "@prisma/client"
import { useState } from "react"
import { api } from "~/trpc/react";

type TodoProps = {
    todoObject: Todo
}
function Todo(props: TodoProps) {
    const { body, isActive, id, createdAt, updatedAt } = props.todoObject
    const [isChecked, setChecked] = useState(!isActive)
    const [isDeleted, setDeleted] = useState(false)

    const updateTodo = api.todo.updateTodo.useMutation({})
    const deleteTodo = api.todo.deleteTodo.useMutation({
        onSuccess: () => setDeleted(true)
    })

    const HandleTodoChange = () => {
        setChecked(!isChecked)
        updateTodo.mutate({
            id: id,
            isAciteve: isChecked
        })
    }

    const HandleDeleteClick = () => {
        deleteTodo.mutate({
            id: id
        })
    }

    return (
        <>
            {
                !isDeleted && <div className="text-2xl flex justify-between">
                    <div>
                        <input type="checkbox"
                            name={`${id}`}
                            id={`${id}`}
                            defaultChecked={isChecked}
                            onChange={HandleTodoChange}
                            className="mr-2" />
                        <label htmlFor={`${id}`} className="select-none">{body}</label>
                    </div>
                    <button onClick={HandleDeleteClick}>X</button>
                </div>}
        </>
    )

}
export default Todo