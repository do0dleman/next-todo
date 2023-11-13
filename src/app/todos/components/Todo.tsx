"use client";
import { useClerk } from "@clerk/nextjs";
import { PrismaClient, Todo } from "@prisma/client"
import { useEffect, useState } from "react"
import { api } from "~/trpc/react";

type TodoProps = {
    todoObject: Todo
}
function Todo(props: TodoProps) {
    const { body, isActive, id, createdAt, updatedAt } = props.todoObject
    const [isChecked, setChecked] = useState(!isActive)

    const updateTodo = api.post.updateTodo.useMutation({})

    const HandleTodoChange = () => {
        setChecked(!isChecked)
        updateTodo.mutate({
            id: id,
            isAciteve: isChecked
        })
    }

    return (
        <div className="text-2xl">
            <input type="checkbox"
                name={`${id}`}
                id={`${id}`}
                defaultChecked={isChecked}
                onChange={HandleTodoChange}
                className="mr-2" />
            <label htmlFor={`${id}`} className="select-none">{body}</label>
        </div>
    )
}
export default Todo