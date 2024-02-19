import { TodoFolder } from "@prisma/client"
import { FaFolder } from "react-icons/fa"
import Folder from "./Folder"
import CreateFolder from "./CreateFolder"
import { HashLoader } from "react-spinners"

type FolderListProps = {
    folders: TodoFolder[] | undefined
    refetch: () => void
}

function FolderList({ folders, refetch }: FolderListProps) {

    return (
        <div className="w-full">
            <h2 className="flex gap-2 align-bottom mb-1 text-2xl md:text-xl justify-between">
                <span className="flex gap-2 align-bottom">
                    <span className="self-center"><FaFolder /> </span>
                    Folders
                </span>
                <span className="self-bottom flex">
                    <CreateFolder refetch={refetch} />
                </span>
            </h2>

            <div className="h-full">
                {folders === undefined ?
                    <div className="h-full w-full flex justify-center mt-20">
                        <HashLoader color="#fff" size={100} />
                    </div>
                    :
                    folders.sort().map(folder => <Folder folder={folder} key={folder.id} />)}
            </div>
        </div>
    )
}
export default FolderList