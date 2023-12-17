import { TodoFolder } from "@prisma/client"
import { FaFolder } from "react-icons/fa"
import { RadioGroup } from '@headlessui/react'
import Folder from "./Folder"
import useTodoStore from "../../../store"
import CreateFolder from "./CreateFolder"

type FolderListProps = {
    folders: TodoFolder[] | undefined
    refetch: () => void
}

function FolderList({ folders, refetch }: FolderListProps) {

    return (
        <div className="">
            <h2 className="flex gap-2 align-bottom mb-2 text-xl justify-between">
                <span className="flex gap-2 align-bottom">
                    <span className="self-center"><FaFolder /> </span>
                    Folders
                </span>
                <span className="self-bottom flex">
                    <CreateFolder refetch={refetch} />
                </span>
            </h2>

            <div className="overflow-y-scroll max-h-[60vh]">
                {folders === undefined ? <></> :
                    folders.sort().map(folder => <Folder folder={folder} key={folder.id} />)}
            </div>
        </div>
    )
}
export default FolderList