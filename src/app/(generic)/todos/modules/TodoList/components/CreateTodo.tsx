"use client"

import { useUser } from "@clerk/nextjs"
import { ChangeEvent, useEffect, useState } from "react"
import useErrorStore from "~/app/store/useErrorStore"
import { api } from "~/trpc/react"
import useTodoStore from "../../../todoStore"

type createTodoProps = {
    refetch: () => void
}
function CreateTodo(props: createTodoProps) {
    const { user } = useUser()

    const currentFolderId = useTodoStore(state => state.currentFolderId)
    const [isDisabled, setDisabled] = useState(currentFolderId === undefined)

    useEffect(() => {
        if (currentFolderId === undefined) {
            setDisabled(true)
        }
        if (currentFolderId !== undefined) {
            setDisabled(false)
        }
    }, [currentFolderId])

    const [inputValue, setInputValue] = useState("")
    function HandleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value)
    }

    const setError = useErrorStore(state => state.setError)

    const createTodo = api.todo.createTodo.useMutation({
        onSuccess: () => {
            props.refetch()
            setInputValue("")
            setDisabled(false)
        },
        onError: (error) => {
            setError(error.data?.zodError?.fieldErrors.body![0] ?? "Something went wrong...")
        }
    })

    const createTodoAction = (formData: FormData) => {
        if (formData.get('body') === '') return

        if ((formData.get('body') as string).length > 256) {
            setError("Todo can contain only up to 256 characters! Try shorten it up.")
            return
        }

        if (currentFolderId === undefined) {
            setError("You must select folder to create a todo!")
            return
        }

        setDisabled(true)
        createTodo.mutate({
            body: formData.get('body') as string,
            userId: user!.id,
            todoFolderId: currentFolderId
        })
    }

    return (
        <>
            <form action={createTodoAction} className="w-full bg-tertiary py-4 ">
                <input type="text"
                    disabled={isDisabled}
                    name="body"
                    placeholder="Write a todo here..."
                    className="mr-2 px-4 py-2 w-full rounded text-2xl bg-transparent outline-none border border-inactive 
                focus:border-mainel transition-all placeholder:text-inactive disabled:border-secondary
                disabled:placeholder:text-secondary"
                    value={inputValue}
                    onChange={HandleInputChange}
                />
            </form>
        </>
    )
}
export default CreateTodo