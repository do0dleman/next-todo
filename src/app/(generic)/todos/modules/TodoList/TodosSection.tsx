import { useUser } from "@clerk/nextjs"
import { api } from "~/trpc/react";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import useTodoStore from "../../store";

function TodosSection() {

    const { user, isLoaded } = useUser()
    const currentFolderId = useTodoStore(store => store.currentFolderId)

    const { data, refetch } = api.todo.getFolderTodos.useQuery({
        folderId: currentFolderId ? currentFolderId : 0
    }, {
        enabled: currentFolderId !== undefined
    })

    const todos = data?.todos

    return (
        <main className="flex flex-col justify-center children:px-8 w-full flex-grow bg-secondary">
            <TodoList todos={todos} user={user} isLoaded={isLoaded} />
            <CreateTodo refetch={refetch} />
        </main>
    )
}
export default TodosSection