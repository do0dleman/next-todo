"use client"

import { useUser } from "@clerk/nextjs"
import { api } from "~/trpc/react"

type createTodoProps = {
    refetch: () => {}
}
function CreateTodo(props: createTodoProps) {
    const { user } = useUser()
    const createTodo = api.todo.createTodo.useMutation({
        onSuccess: () => {
            props.refetch()
        }
    })

    const createTodoAction = async (formData: FormData) => {
        // "use server"

        createTodo.mutate({
            body: formData.get('body') as string,
            userId: user!.id
        })

    }

    return (
        <form action={createTodoAction}>
            <input type="text"
                name="body"
                className="mr-2 px-4 py-2 text-gray-950"
            />
            <input type="submit" value="Create" className="border px-4 py-2 cursor-pointer" />
        </form>
    )
}
export default CreateTodo