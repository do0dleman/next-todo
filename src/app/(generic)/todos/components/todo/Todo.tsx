"use client";
import { Todo } from "@prisma/client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { api } from "~/trpc/react";
import EditTodoMenu from "./EditTodoMenu";
import { KeyboardEvent } from "react"

type TodoProps = {
    todoObject: Todo
}
function Todo(props: TodoProps) {
    const { body, isActive, id, createdAt, updatedAt } = props.todoObject
    const [isChecked, setChecked] = useState(!isActive)
    const [isDeleting, setDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [todoBody, setTodoBody] = useState(body)

    const updateTodo = api.todo.updateTodo.useMutation({})
    const deleteTodo = api.todo.deleteTodo.useMutation({
        onError: () => setDeleting(false)
    })

    const HandleTodoStateChange = () => {
        setChecked(!isChecked)
        updateTodo.mutate({
            id: id,
            isAcitve: isChecked,
            body: body
        })
    }

    const HandleDeleteClick = () => {
        setDeleting(true)
        deleteTodo.mutate({
            id: id
        })
    }

    //* This segment handles todo edit
    const editInputRef = useRef<HTMLInputElement>(null)
    const EditOnblur = () => {
        setIsEditing(false)
        if (todoBody == "") {
            HandleDeleteClick()
        }
        if (body != todoBody) {
            updateTodo.mutate({
                id: id,
                body: todoBody,
                isAcitve: isActive
            })
        }
    }
    const HandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            EditOnblur()
        }
    }

    const HadnleEditClick = () => {
        setIsEditing(true)
    }
    useEffect(() => {
        if (isEditing) editInputRef.current!.focus()
    }, [isEditing])

    const HadnleEditInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTodoBody(e.target.value)
    }
    //* ---------------------

    return (
        <>
            {!isDeleting && <label htmlFor={`${id}`}
                className=" text-2xl flex justify-between even:bg-secondary px-8 fill-none hover:fill-inactive">
                <div className="py-2 w-full flex items-center">
                    <input type="checkbox"
                        name={`${id}`}
                        id={`${id}`}
                        defaultChecked={isChecked}
                        onChange={HandleTodoStateChange}
                        className="mr-3 w-6 h-6 accent-active peer" />
                    <label
                        htmlFor={`${id}`}
                        className="w-full select-none peer-checked:text-opacity-60 peer-checked:child:line-through peer-checked:text-inactive">
                        <input type="text"
                            ref={editInputRef}
                            size={1}
                            className={"bg-transparent w-full outline-none border-b border-inactive focus:border-mainel transition-all"
                                + (isEditing ? "" : " hidden")}
                            value={todoBody}
                            onChange={HadnleEditInputChange}
                            onBlur={EditOnblur}
                            onKeyDown={HandleKeyDown}
                        />
                        <span className={"inline-block border-b border-transparent relative top-0 "
                            + (isEditing ? "hidden" : " ")}>
                            {todoBody}
                        </span>

                    </label>
                </div>

                <EditTodoMenu HandleDeleteClick={HandleDeleteClick} HandleEditClick={HadnleEditClick} />
            </label>}
        </>
    )

}
export default Todo