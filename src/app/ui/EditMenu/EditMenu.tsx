import { Menu, Transition } from "@headlessui/react"
import type { MouseEventHandler } from "react"
import { FaEllipsisH, FaPen, FaRegTrashAlt } from "react-icons/fa"

function EditTodoMenu({ children }: { children: React.ReactNode }) {

    return (
        <Menu as="div" className="relative flex ml-4 items-start">
            <Menu.Button className="flex justify-center items-start w-6 h-6 py-2">
                <span className="children:fill-inherit hover:fill-mainel transition-all duration-300">
                    <FaEllipsisH />
                </span>
            </Menu.Button>
            <Transition as="div" className="absolute right-0 top-9 z-50"
                appear={true}
                unmount={false}
                enter="transition-opacity transition-transform duration-300 origin-top-right"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition-opacity duration-300 transition-transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
            >
                <Menu.Items as="div" className="w-80 bg-tertiary rounded overflow-hidden absolute right-0 top-9 z-50">
                    {children}
                </Menu.Items>
            </Transition >
        </Menu >
    )
}
export default EditTodoMenu