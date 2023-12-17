import { Menu } from "@headlessui/react"
import { MouseEventHandler } from "react"
import { FaRegTrashAlt } from "react-icons/fa"

function DeleteButton({ HandleDeleteClick }:
    { HandleDeleteClick: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Menu.Item>
            <button className="w-full py-2 px-4 text-left text-lg flex items-center gap-2 
            hover:bg-mainel hover:bg-opacity-5 active:bg-opacity-10 transition-all duration-300"
                onClick={HandleDeleteClick}
            >
                <span className="children:fill-active"><FaRegTrashAlt /></span>
                Delete
            </button>
        </Menu.Item>
    )
}
export default DeleteButton