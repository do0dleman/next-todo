import { Dialog } from "@headlessui/react"
import { FaExclamationCircle } from "react-icons/fa"
import SecondaryButton from "./SecondaryButton"

type ErrorModalProps = {
    error: string,
    onClose: () => void
}
function ErrorModal({ error, onClose }: ErrorModalProps) {

    console.log(error)
    return (
        <Dialog open={!!error} onClose={onClose} className="relative z-20">
            <div className="fixed inset-0 bg-tertiary/50" aria-hidden="true" />
            <div className="fixed w-screen h-screen flex items-center justify-center">
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
            </div>
        </Dialog>
    )
}
export default ErrorModal