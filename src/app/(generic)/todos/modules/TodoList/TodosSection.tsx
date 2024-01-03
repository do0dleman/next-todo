import { api } from "~/trpc/react";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";
import useTodoStore from "../../todoStore";
import useTodoListStore from "./todoListStore";

function TodosSection({ showMobiles }: { showMobiles: boolean }) {

    const currentFolderId = useTodoStore(store => store.currentFolderId)
    const setTodos = useTodoListStore(store => store.setTodos)

    const { data, refetch } = api.todo.getFolderTodos.useQuery({
        folderId: currentFolderId ? currentFolderId : 0
    }, {
        enabled: currentFolderId !== undefined
    })

    setTodos(data?.todos)
    return (
        <>
            {showMobiles ? <main className={`flex flex-col justify-center 
            children:px-8 w-full flex-grow bg-secondary`}>
                <TodoList />
                <CreateTodo refetch={refetch} />
            </main> : <></>}
        </>
    )
}
export default TodosSection