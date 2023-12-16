import { TodoFolder } from "@prisma/client"
import { FaFolder } from "react-icons/fa"
import { RadioGroup } from '@headlessui/react'
import Folder from "./Folder"
import useTodoStore from "../../../store"

type FolderListProps = {
    folders: TodoFolder[] | undefined
}

function FolderList({ folders }: FolderListProps) {


    return (
        <div >
            <h2 className="flex gap-2 align-bottom mb-2 text-xl">
                <span className="self-center"><FaFolder /> </span>
                Folders
            </h2>

            <div>
                {folders === undefined ? <></> :
                    folders.map(folder => <Folder folder={folder} key={folder.id} />)}
            </div>
        </div>
    )
}
export default FolderList