import { Todo as TodoType } from "@prisma/client"
import Todo from "./Todo"
import { UserResource } from "@clerk/types"
import { HashLoader } from "react-spinners"
import useTodoStore from "../../../store"


type TodoListProps = {
    todos: TodoType[] | undefined,
    user: UserResource | null | undefined
    isLoaded: boolean
}

function TodoList({ todos, user, isLoaded }: TodoListProps) {
    const currentFolderId = useTodoStore(state => state.currentFolderId)

    if (currentFolderId === undefined) return <div className="flex items-center justify-center h-full"></div>

    if (!isLoaded || todos === undefined) {
        return <div className="flex items-center justify-center h-full">
            <HashLoader color="#fff" size={100} />
        </div>
    }

    return (
        <div className="px-0 h-full">
            {todos.map((todo) => <Todo todoObject={todo} key={todo.id} />)}
            {((todos.length === 0) && isLoaded) &&
                <div className="container mx-auto text-center text-xl mt-4">
                    {`No todos where found for user ${user ? user.username : ''}`}
                </div>}
        </div>
    )
}
export default TodoList