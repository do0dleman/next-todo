"use client"

import { Dialog, Transition } from "@headlessui/react"
import useErrorStore from "../../store/useErrorStore"
import { FaExclamationCircle } from "react-icons/fa"
import SecondaryButton from "../SecondaryButton"

function ErrorProvider({ children }: { children: React.ReactNode }) {

    const error = useErrorStore((state) => state.error)
    const setError = useErrorStore((state) => state.setError)

    const onClose = () => {
        setError('')
    }

    return (
        <>
            <Dialog open={!!error} onClose={onClose} className="relative z-[500]">
                <div className="fixed inset-0 bg-tertiary/50" aria-hidden="true" />
                <div className="fixed w-screen h-screen flex items-center justify-center top-0">
                    <Transition show={!!error} as="div"
                        appear={true}
                        // unmount={false} // does it work?
                        enter="transition-opacity transition-transform duration-150"
                        enterFrom="opacity-0 scale-90"
                        enterTo="opacity-100 scale-100"
                        leave="transition-opacity duration-1000"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Panel as="div" className="max-w-40 bg-main rounded-lg relative z-40 overflow-hidden pb-4">
                            <Dialog.Title className="flex items-center gap-2 py-2 mb-4 text-2xl text-error bg-error/20 px-6">
                                <FaExclamationCircle />
                                Error
                            </Dialog.Title>
                            <div className="px-6">
                                <Dialog.Description className="text-lg mb-4">
                                    {error}
                                </Dialog.Description>

                                <SecondaryButton
                                    onClick={onClose}
                                    className=""
                                >
                                    Got it
                                </SecondaryButton>
                            </div>
                        </Dialog.Panel>
                    </Transition>

                </div>
            </Dialog>
            {children}
        </>
    )
}
export default ErrorProvider