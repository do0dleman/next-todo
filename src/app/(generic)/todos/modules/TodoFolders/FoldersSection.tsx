"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import FolderList from "./components/FolderList";

function FoldersSection() {

    const { user, isLoaded } = useUser()

    const { data: folderData, refetch } = api.todoFolder.getUserFolders.useQuery({ userId: user ? user.id : '' }, {
        enabled: isLoaded
    })

    const folders = folderData?.folders

    return (
        <div className="bg-main flex-1 basis-1/4 pt-2 px-4">
            <FolderList folders={folders} refetch={refetch} />
        </div>
    )
}
export default FoldersSection