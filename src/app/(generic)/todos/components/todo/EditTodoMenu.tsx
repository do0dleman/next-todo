import { Menu } from "@headlessui/react"
import type { MouseEventHandler } from "react"
import { FaEllipsisH, FaPen, FaRegTrashAlt } from "react-icons/fa"

type EditTodoMenuProps = {
    HandleDeleteClick: MouseEventHandler<HTMLButtonElement>,
    HandleEditClick: MouseEventHandler<HTMLButtonElement>,
}
function EditTodoMenu(props: EditTodoMenuProps) {

    const { HandleDeleteClick, HandleEditClick } = props

    return (
        <Menu as="div" className="relative flex ml-4 items-start">
            <Menu.Button className="flex justify-center items-start w-6 h-6 py-2">
                <span className="children:fill-inherit hover:fill-mainel transition-all duration-300">
                    <FaEllipsisH />
                </span>
            </Menu.Button>
            <Menu.Items as="div" className="absolute right-0 top-9 w-80 bg-tertiary z-10">
                <Menu.Item>
                    <button className="w-full py-2 px-4 text-left text-lg flex items-center gap-2 
                            hover:bg-mainel hover:bg-opacity-5 active:bg-opacity-10 transition-all duration-300"
                        onClick={HandleEditClick}>
                        <span className="children:fill-active"><FaPen /></span>
                        Edit
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button className="w-full py-2 px-4 text-left text-lg flex items-center gap-2 
                            hover:bg-mainel hover:bg-opacity-5 active:bg-opacity-10 transition-all duration-300"
                        onClick={HandleDeleteClick}>
                        <span className="children:fill-active"><FaRegTrashAlt /></span>
                        Delete
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
export default EditTodoMenu