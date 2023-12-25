"use client";

import FoldersSection from "./modules/TodoFolders/FoldersSection";
import TodosSection from "./modules/TodoList/TodosSection";
import MobileSectionPicker from "./components/MobileSectionPicker";
import { useState } from "react";

function Todos() {

    const [isShowFolders, setShowFolders] = useState(true)
    const onFolderClick = () => {
        setShowFolders(true)
    }
    const onTodosClick = () => {
        setShowFolders(false)
    }
    return (
        <div className="h-full max-h-full flex-grow flex flex-col">
            <div className="flex h-full max-h-full flex-grow">
                <FoldersSection showMobiles={isShowFolders} />
                <TodosSection showMobiles={!isShowFolders} />
            </div>
            <MobileSectionPicker
                onTodosClick={onTodosClick}
                onFolderClick={onFolderClick}
            />
        </div>
    )
}
export default Todos