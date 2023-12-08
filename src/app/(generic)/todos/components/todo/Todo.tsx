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

    const updateTodo = api.todo.updateTodo.useMutation({
        onError: (err) => console.log(err)
    })
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
    const editAreaRef = useRef<HTMLTextAreaElement>(null)
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
    const HandleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter") {
            EditOnblur()
        }
    }

    const HadnleEditClick = () => {
        setIsEditing(true)
    }
    useEffect(() => {
        const end = editAreaRef.current!.value.length
        editAreaRef.current!.setSelectionRange(end, end)
        if (isEditing) editAreaRef.current!.focus()
    }, [isEditing])

    const HadnleEditAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTodoBody(e.target.value)
    }
    useEffect(() => {
        console.log(editAreaRef.current!.offsetHeight)
        editAreaRef.current!.style.height = 'auto'
        editAreaRef.current!.style.height = `${editAreaRef.current!.scrollHeight}px`
    }, [todoBody])
    //* ---------------------

    return (
        <>
            {!isDeleting && <label htmlFor={`${id}`}
                className=" text-2xl flex justify-between even:bg-secondary px-8 fill-none hover:fill-inactive">
                <div className="py-2 w-full flex items-start">
                    <input type="checkbox"
                        name={`${id}`}
                        id={`${id}`}
                        defaultChecked={isChecked}
                        onChange={HandleTodoStateChange}
                        className="mt-1 mr-3 w-6 h-6 accent-active peer" />
                    <label
                        htmlFor={`${id}`}
                        className="w-full select-none peer-checked:text-opacity-60 peer-checked:child:line-through peer-checked:text-inactive">
                        <textarea
                            rows={1}
                            ref={editAreaRef}
                            className={"bg-transparent w-full outline-none border-b border-inactive focus:border-mainel transition-all"
                                + " resize-none overflow-hidden"
                                + (isEditing ? "" : " hidden")}
                            value={todoBody}
                            onChange={HadnleEditAreaChange}
                            onBlur={EditOnblur}
                            onKeyDown={HandleKeyDown}
                        />
                        <span className={"block border-b border-transparent max-w-full"
                            + (isEditing ? " hidden" : " ")}>
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