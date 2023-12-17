"use client";

import FoldersSection from "./modules/TodoFolders/FoldersSection";
import TodosSection from "./modules/TodoList/TodosSection";

function Todos() {

    return (
        <div className="flex h-full max-h-full flex-grow">
            <FoldersSection />
            <TodosSection />
        </div>
    )
}
export default Todos