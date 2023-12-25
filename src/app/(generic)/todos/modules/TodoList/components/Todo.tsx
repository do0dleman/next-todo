"use client";
import { Todo } from "@prisma/client"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { api } from "~/trpc/react";
import EditTodoMenu from "./EditTodoMenu";
import type { KeyboardEvent } from "react"
import useErrorStore from "~/app/store/useErrorStore";
import useInputFieldEdit from "~/app/hooks/useInputFieldEdit";

type TodoProps = {
    todoObject: Todo,
}
function Todo(props: TodoProps) {
    const { body, isActive, id, createdAt, updatedAt } = props.todoObject
    const [isChecked, setChecked] = useState(!isActive)
    const [isDeleting, setDeleting] = useState(false)

    const [todoBody, setTodoBody] = useState(body)

    const setError = useErrorStore(state => state.setError)

    const updateTodo = api.todo.updateTodo.useMutation({
        onError: (error) => {
            setError(error.data?.zodError?.fieldErrors.body![0])
        }
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
    const EditOnBlur = () => {
        setEditing(false)
        if (todoBody.length > 256) {
            setError("Todo can contain only up to 256 characters! Try shorten it up.")
            return
        }
        if (todoBody == "") {
            HandleDeleteClick()
            return
        }
        if (body != todoBody) {
            updateTodo.mutate({
                id: id,
                body: todoBody,
                isAcitve: isActive
            })
        }
    }
    const editAreaRef = useRef<HTMLTextAreaElement>(null)
    const [isEditing, setEditing] = useInputFieldEdit(editAreaRef)


    const HadnleEditClick = () => {
        setEditing(true)
    }

    const HadnleEditAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTodoBody(e.target.value)
    }
    useEffect(() => {
        if (editAreaRef.current === null) return

        editAreaRef.current.style.height = 'auto'
        editAreaRef.current.style.height = `${editAreaRef.current.scrollHeight}px`
    }, [todoBody])

    //* ---------------------

    return (
        <>
            {!isDeleting && //! transtion breaks edit menu, mb something with z-index but not sure
                // <Transition show={!isDeleting}
                //     appear={true}
                //     unmount={false}
                //     enter={`transition-opacity transition-transform duration-300`}
                //     enterFrom="opacity-0 translate-y-3"
                //     enterTo="opacity-100 translate-y-0"
                //     leave="transition-opacity duration-300 transition-transform"
                //     leaveFrom="opacity-100 translate-y-0"
                //     leaveTo="opacity-0 translate-y-3"
                // >
                <label htmlFor={`${id}`}
                    className=" text-2xl flex justify-between align-middle px-8 
                    fill-none hover:fill-inactive">
                    <div className="py-2 w-full flex items-start">
                        <input type="checkbox"
                            name={`${id}`}
                            id={`${id}`}
                            defaultChecked={isChecked}
                            onChange={HandleTodoStateChange}
                            className="mt-1 mr-3 w-6 h-6 accent-active peer" />
                        <label
                            htmlFor={`${id}`}
                            className="w-full select-none peer-checked:text-opacity-60
                            peer-checked:child:line-through 
                        peer-checked:text-inactive relative">
                            <textarea
                                rows={1}
                                ref={editAreaRef}
                                className={"bg-transparent w-full outline-none border-b"
                                    + " border-inactive focus:border-mainel"
                                    + " transition-all resize-none overflow-hidden absolute z-10"
                                    + (isEditing ? "" : " invisible")
                                }
                                value={todoBody}
                                onChange={HadnleEditAreaChange}
                                onBlur={EditOnBlur}
                            />
                            <span className={"block border-b border-transparent max-w-full"
                                + (isEditing ? "invisible" : "")
                            }>
                                {todoBody}
                            </span>

                        </label>
                    </div >

                    <EditTodoMenu HandleDeleteClick={HandleDeleteClick} HandleEditClick={HadnleEditClick} />
                </label >
                // </Transition>
            }
        </>
    )

}
export default Todo