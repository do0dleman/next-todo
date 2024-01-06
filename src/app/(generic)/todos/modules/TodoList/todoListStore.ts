import { Todo } from '@prisma/client'
import { inferRouterInputs } from '@trpc/server'
import { create } from 'zustand'
import { AppRouter } from '~/server/api/root'
import { api } from '~/trpc/react'

type TodoMutateParams = inferRouterInputs<AppRouter>['todo']['updateTodo']
type ApiUpdateTodo = ReturnType<typeof api.todo.updateTodo.useMutation>

type TodoCreateParams = inferRouterInputs<AppRouter>['todo']['createTodo']
type ApiCreateTodo = ReturnType<typeof api.todo.createTodo.useMutation>

type TodoListStore = {
    todos: Todo[] | undefined
    getActiveTodos: () => Todo[] | []
    getInactiveTodos: () => Todo[] | []
    setTodos: (todos: Todo[] | undefined) => void
    deleteTodoLocaly: (todoId: number) => void
    mutateTodo: (apiUpdateTodo: ApiUpdateTodo, todo: TodoMutateParams) => void
    createTodo: (apiCreateTodo: ApiCreateTodo, todo: TodoCreateParams) => void
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

    deleteTodoLocaly: (todoId) => set(() => {
        const todos = get().todos
        if (!todos) return { todos: todos }
        return { todos: todos.filter(todo => todo.id !== todoId) }
    }),

    mutateTodo: (apiUpdateTodo: ApiUpdateTodo, todoParamsToMutate: TodoMutateParams) => set(() => {
        const todos = get().todos
        if (!todos) return { todos: todos }

        const todoToMutate = todos.find(todo => todo.id === todoParamsToMutate.id)!

        apiUpdateTodo.mutate(todoParamsToMutate)

        return {
            todos: [
                ...todos.filter(todo => todo.id !== todoToMutate.id),
                {
                    ...todoToMutate,
                    ...todoParamsToMutate
                }
            ]
        }
    }),

    createTodo: (apiCreateTodo: ApiCreateTodo, todoCreateParams: TodoCreateParams) => set(() => {
        const todos = get().todos

        const newTodo: Todo = {
            ...todoCreateParams,
            id: Infinity,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true
        }

        apiCreateTodo.mutate(todoCreateParams)

        return {
            todos: [
                ...(todos === undefined ? [] : todos),
                newTodo
            ]
        }
    }),
    onApiCreateTodo: () => set(() => {
        const todos = get().todos

        return {
            todos: [

            ]
        }
    })

}))

export default useTodoListStore