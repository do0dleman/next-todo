import { Menu, Transition } from "@headlessui/react"
import { useRef, type MouseEventHandler, useEffect, useState } from "react"
import { FaEllipsisH, FaPen, FaRegTrashAlt } from "react-icons/fa"

function EditTodoMenu({ children }: { children: React.ReactNode }) {

    const MENU_WIDTH = 320
    const MIN_MARGIN = 5

    const menuRef = useRef<HTMLElement>(null)
    const [isClippingLeft, setClippingLeft] = useState(false)

    useEffect(() => {
        if (menuRef.current !== undefined) {
            const clientRect = menuRef!.current!.getBoundingClientRect()
            // if ((children! as any[]).length! !== undefined) {

            // }
            if (clientRect.x < MENU_WIDTH + MIN_MARGIN) {
                setClippingLeft(true)
            }
        }
    }, [menuRef])

    const xAxisPosition = isClippingLeft ? 'left-0' : 'right-0'

    return (
        <Menu as="div" className="relative flex ml-4 items-center" ref={menuRef}>
            <Menu.Button className="flex justify-center items-start w-6 h-6 text-2xl">
                <span className="children:fill-inherit hover:fill-mainel transition-all duration-300">
                    <FaEllipsisH />
                </span>
            </Menu.Button>
            <Transition as="div" className={`absolute top-0 z-50 ${xAxisPosition}`}
                appear={true}
                unmount={false}
                enter="transition-opacity transition-transform duration-300 origin-top-right"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition-opacity duration-300 transition-transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-75"
            >
                <Menu.Items as="div" className={`w-80 bg-tertiary rounded overflow-hidden absolute ${xAxisPosition} top-0 z-50`}>
                    {children}
                </Menu.Items>
            </Transition >
        </Menu >
    )
}
export default EditTodoMenu