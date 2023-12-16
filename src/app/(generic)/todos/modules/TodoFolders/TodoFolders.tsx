"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import FolderList from "./components/FolderList";

function TodoFolders() {

    const { user, isLoaded } = useUser()

    const { data: folderData, refetch } = api.todoFolder.getUserFolders.useQuery({ userId: user ? user.id : '' }, {
        enabled: isLoaded
    })

    const folders = folderData?.folders

    return (
        <div className="bg-main flex-1 basis-1/4 py-2 px-4">
            <FolderList folders={folders} />
        </div>
    )
}
export default TodoFolders