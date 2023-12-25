"use client";

import FoldersSection from "./modules/TodoFolders/FoldersSection";
import TodosSection from "./modules/TodoList/TodosSection";
import MobileSectionPicker from "./components/MobileSectionPicker";
import { useState } from "react";
import useMedia from "~/app/hooks/useMedia";

function Todos() {

    const [isShowFolders, setShowFolders] = useState(true)
    const media = useMedia()
    const IS_NOT_MOBILE = media !== ''

    const onFolderClick = () => {
        setShowFolders(true)
    }
    const onTodosClick = () => {
        setShowFolders(false)
    }
    return (
        <div className="h-full max-h-full flex-grow flex flex-col">
            <div className="flex h-full max-h-full flex-grow">
                <FoldersSection showMobiles={isShowFolders || IS_NOT_MOBILE} />
                <TodosSection showMobiles={!isShowFolders || IS_NOT_MOBILE} />
            </div>
            <MobileSectionPicker
                onTodosClick={onTodosClick}
                onFolderClick={onFolderClick}
            />
        </div>
    )
}
export default Todos