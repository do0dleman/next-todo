import { Todo as TodoType } from "@prisma/client"
import Todo from "./Todo"
import { UserResource } from "@clerk/types"
import { HashLoader } from "react-spinners"
import useTodoStore from "../../../store"


type TodoListProps = {
    todos: TodoType[] | undefined,
}

function TodoList({ todos }: TodoListProps) {
    const currentFolderId = useTodoStore(state => state.currentFolderId)

    if (currentFolderId === undefined) return <div className="flex items-center justify-center h-full"></div>

    if (todos === undefined) {
        return <div className="flex items-center justify-center h-full">
            <HashLoader color="#fff" size={100} />
        </div>
    }

    return (
        <div className="px-0 h-full">
            {todos.map((todo) => <Todo todoObject={todo} key={todo.id} />)}
            {(todos.length === 0) &&
                <div className="container mx-auto text-center text-xl mt-4">
                    {`No todos here yet`}
                </div>}
        </div>
    )
}
export default TodoList