"use client";

import TodoFolders from "./modules/TodoFolders/TodoFolders";
import TodosSection from "./modules/TodoList/TodosSection";

function Todos() {

    return (
        <div className="flex h-full flex-grow">
            <TodoFolders />
            <TodosSection />
        </div>
    )
}
export default Todos