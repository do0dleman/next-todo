import { Todo } from '@prisma/client'
import { create } from 'zustand'

type TodoListStore = {
    todos: Todo[] | undefined
    getActiveTodos: () => Todo[] | []
    getInactiveTodos: () => Todo[] | []
    setTodos: (todos: Todo[] | undefined) => void
}

const useTodoListStore = create<TodoListStore>((set, get) => ({
    todos: undefined,
    getActiveTodos: () => {
        const todos = get().todos
        if (todos) {
            return todos.filter(todo => todo.isActive)
        }
        return []
    },
    getInactiveTodos: () => {
        const todos = get().todos
        if (todos) {
            return todos.filter(todo => !todo.isActive)
        }
        return []
    },
    setTodos: (todos: Todo[] | undefined) => set(() => {
        if (todos === undefined) return { todos: undefined }
        return { todos: todos }
    }),

}))

export default useTodoListStore