import { Menu } from "@headlessui/react"
import { MouseEventHandler } from "react"
import { FaPen } from "react-icons/fa"

function EditButton({ HandleEditClick }:
    { HandleEditClick: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Menu.Item>
            <button className="w-full py-2 px-4 text-left text-lg flex items-center gap-2 hover:bg-mainel 
            hover:bg-opacity-5 active:bg-opacity-10 transition-all duration-300"
                onClick={HandleEditClick}
            >
                <span className="children:fill-active"><FaPen /></span>
                Edit
            </button>
        </Menu.Item>
    )
}
export default EditButton