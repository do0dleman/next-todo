import { RadioGroup } from "@headlessui/react"
import { TodoFolder } from "@prisma/client"
import { useRef, useState } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import useErrorStore from "~/app/store/useErrorStore"
import { api } from "~/trpc/react"
import useTodoStore from "../../../store"

function Folder({ folder }: { folder: TodoFolder }) {

    const [folderName, setFolderName] = useState(folder.name)

    const setError = useErrorStore(store => store.setError)
    const currentFolderId = useTodoStore(store => store.currentFolderId)
    const setCurrentFolderId = useTodoStore(store => store.setCurrentFolderId)

    const updateFolder = api.todoFolder.updateFolder.useMutation({
        onError: (error) => setError(error.data?.zodError?.fieldErrors.body![0])
    })

    function HandleFolderNameChange(e: ChangeEvent<HTMLInputElement>) {
        setFolderName(e.target.value)
    }

    const HandleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            e.preventDefault()
            if (!editInputRef.current) return

            if (folderName.length === 0) {
                setFolderName(folder.name)
                editInputRef.current.blur()
                return
            }
            if (folderName.length > 32) {
                setError("Folder name can contain only up to 32 characters! Try shorten it up.")
                return
            }

            updateFolder.mutate({
                id: folder.id,
                name: folderName
            })
            editInputRef.current.blur()
        }
    }

    const editInputRef = useRef<HTMLInputElement>(null)

    function HandleFolderNameClick() {
        setCurrentFolderId(folder.id)
    }

    return (
        <div className="">
            <input type="radio" name="folders" id={folder.name + folder.id}
                className="border-b border-transparent"
                checked={folder.id === currentFolderId}
                value={folder.id}
                onChange={HandleFolderNameClick}
            />
            <label htmlFor={folder.name + folder.id}>{folderName}</label>
            <input type="text" className="bg-transparent outline-none border-b border-transparent 
            transition-colors duration-200 focus:border-mainel"
                ref={editInputRef}
                value={folderName}
                onChange={HandleFolderNameChange}
                onKeyDown={HandleKeyDown}
            />
        </div>


    )
}
export default Folder