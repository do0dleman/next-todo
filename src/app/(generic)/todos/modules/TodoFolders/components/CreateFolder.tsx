"use client";

import { useUser } from "@clerk/nextjs";
import { FaFolderPlus } from "react-icons/fa"
import useErrorStore from "~/app/store/useErrorStore";
import { api } from "~/trpc/react"

function CreateFolder({ refetch }: { refetch: () => void }) {

    const { user } = useUser()
    const setError = useErrorStore(store => store.setError)
    const createFolder = api.todoFolder.createFolder.useMutation({
        onSuccess: () => refetch(),
        onError: () => setError('Failed to create a folder. Try again later.'),
    })

    function HandleCreateFolderClick() {
        if (!user) return
        createFolder.mutate({ userId: user.id })
    }

    return (
        <button onClick={HandleCreateFolderClick}>
            <FaFolderPlus />
        </button>
    )
}
export default CreateFolder