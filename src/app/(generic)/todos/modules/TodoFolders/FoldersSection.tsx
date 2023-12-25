"use client";

import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import FolderList from "./components/FolderList";

function FoldersSection({ showMobiles }: { showMobiles: boolean }) {

    const { user, isLoaded } = useUser()

    const { data: folderData, refetch } = api.todoFolder.getUserFolders.useQuery(
        { userId: user ? user.id : '' },
        {
            enabled: isLoaded,
            refetchInterval(data, query) {
                const folders = data?.folders
                if (folders && query.state.dataUpdateCount < 20) {
                    if (folders.length === 0) {
                        return 500
                    }
                }
                return 5 * 60 * 1000
            },
        })

    const folders = folderData?.folders

    return (
        <>
            {showMobiles ? <div className={`flex bg-main flex-1 basis-1/4 pt-2 px-4`}>
                <FolderList folders={folders} refetch={refetch} />
            </div> : <></>}
        </>
    )
}
export default FoldersSection