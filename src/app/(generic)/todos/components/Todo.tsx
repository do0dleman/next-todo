"use client";
import { Todo } from "@prisma/client"
import { useState } from "react"
import { api } from "~/trpc/react";
import { FaRegTrashAlt } from "react-icons/fa";

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
            {!isDeleted && <label htmlFor={`${id}`} className="group text-2xl flex justify-between even:bg-[#202020] px-8">
                <div className="py-2">
                    <input type="checkbox"
                        name={`${id}`}
                        id={`${id}`}
                        defaultChecked={isChecked}
                        onChange={HandleTodoChange}
                        className="mr-3 w-6 h-6 accent-violet-800 peer" />
                    <label
                        htmlFor={`${id}`}
                        className="select-none peer-checked:line-through peer-checked:text-opacity-40 peer-checked:text-slate-100">
                        {body}
                    </label>
                </div>
                <button className="children:fill-transparent group-hover:children:fill-slate-500
                 hover:children:!fill-red-600 children:transition-all"
                    onClick={HandleDeleteClick}>
                    {<FaRegTrashAlt />}
                </button>
            </label>}
        </>
    )

}
export default Todo