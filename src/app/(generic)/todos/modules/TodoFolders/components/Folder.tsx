import { TodoFolder } from "@prisma/client"
import { useRef, useState } from "react"
import type { ChangeEvent, KeyboardEvent } from "react"
import useErrorStore from "~/app/store/useErrorStore"
import { api } from "~/trpc/react"
import useTodoStore from "../../../todoStore"
import EditFolderMenu from "./EditFolderMenu"
import useInputFieldEdit from "~/app/hooks/useInputFieldEdit"

function Folder({ folder }: { folder: TodoFolder }) {

    const [folderName, setFolderName] = useState(folder.name)
    const [isDeleting, setDeleting] = useState(false)

    const setError = useErrorStore(store => store.setError)
    const currentFolderId = useTodoStore(store => store.currentFolderId)
    const setCurrentFolderId = useTodoStore(store => store.setCurrentFolderId)

    const IS_CURRENT_FOLDER = folder.id === currentFolderId

    const deleteFolder = api.todoFolder.deleteFolder.useMutation({
        onError: (error) => {
            setError(error.data?.zodError?.fieldErrors.body![0])
            setDeleting(false)
        }
    })
    const todosData = api.todo.getFolderTodos.useQuery({ folderId: folder.id })
    const todos = todosData.data?.todos

    const deleteTodo = api.todo.deleteTodo.useMutation({
        onError: (error) => {
            setError(error.data?.zodError?.fieldErrors.body![0])
        },
    })

    const updateFolder = api.todoFolder.updateFolder.useMutation({
        onError: (error) => setError(error.data?.zodError?.fieldErrors.body![0])
    })

    const HandleDeleteClick = () => {
        setDeleting(true)
        if (IS_CURRENT_FOLDER) {
            setCurrentFolderId(undefined)
        }

        if (!todos) {
            setError('Failed to load todos for deletion')
            setDeleting(false)
            return
        }

        todos.forEach((todo) => {
            deleteTodo.mutate({ id: todo.id })
        })
        deleteFolder.mutate({
            id: folder.id
        })
    }

    function HandleFolderNameClick() {
        setCurrentFolderId(folder.id)
    }

    const editInputRef = useRef<HTMLInputElement>(null)
    const [isEditing, setEditing] = useInputFieldEdit(editInputRef)

    const HandleEditClick = () => {
        setEditing(true)
    }

    function HandleFolderNameChange(e: ChangeEvent<HTMLInputElement>) {
        setFolderName(e.target.value)
    }

    const onBlur = () => {
        setEditing(false)
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
    }

    return (
        <>
            {!isDeleting && <label
                className={`flex fill-none hover:fill-inactive justify-between 
                align-top py-0.5 relative px-2 text-xl md:text-base
                ${IS_CURRENT_FOLDER ? 'bg-opacity-40 bg-tertiary' : ''}
                `}
                htmlFor={folder.name + folder.id}
            >
                <div className={`w-1 absolute bg-mainel h-full top-0 -left-1 
                bg-opacity-0 transition-color duration-300
                ${IS_CURRENT_FOLDER ? 'bg-opacity-100' : ''}
                `} />
                <span>
                    <input type="radio" name="folders" id={folder.name + folder.id}
                        className="border-b border-transparent hidden"
                        checked={IS_CURRENT_FOLDER}
                        value={folder.id}
                        onChange={HandleFolderNameClick}
                    />
                    <label htmlFor={folder.name + folder.id}
                        className={`${IS_CURRENT_FOLDER ? '' : ''} ${isEditing ? 'hidden' : ''}`}
                    >
                        {folderName}
                    </label>
                    <input type="text" className={`bg-transparent outline-none 
                    border-b border-transparent 
                    transition-colors duration-200 focus:border-mainel w-full 
                    ${isEditing ? '' : 'hidden'}
                    `}
                        ref={editInputRef}
                        value={folderName}
                        onChange={HandleFolderNameChange}
                        onBlur={onBlur}
                    />
                </span>
                <EditFolderMenu HandleDeleteClick={HandleDeleteClick} HandleEditClick={HandleEditClick} />
            </label>}
        </>
    )
}
export default Folder