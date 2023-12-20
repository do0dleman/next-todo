import { RefObject, SetStateAction, Dispatch, useEffect, useState } from "react"

/**
 * To use you must provide onblur event for editAreaRef.current Handles Input or TextArea edit logic:
 * * complete edit on Enter click
 * * focus on an end of editArea on edit
 * @param {RefObject<HTMLTextAreaElement | HTMLInputElement>} editAreaRef 
 * @returns {[boolean, Dispatch<SetStateAction<boolean>>]}
 */
export default function useInputFieldEdit(
    editAreaRef: RefObject<HTMLTextAreaElement | HTMLInputElement>,
): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [isEditing, setEditing] = useState(false)

    const HandleKeyDown = (e: Event) => {
        if ((e as KeyboardEventInit).code === "Enter") {
            e.preventDefault()
            editAreaRef!.current!.blur()
        }
    }

    useEffect(() => {
        if (editAreaRef.current && editAreaRef) {
            editAreaRef.current.onkeydown = HandleKeyDown
        }
    }, [editAreaRef])

    useEffect(() => {
        if (editAreaRef.current === null) return

        if (isEditing) {
            const end = editAreaRef.current.value.length
            editAreaRef.current.setSelectionRange(end, end)
            editAreaRef.current.focus()
        }
    }, [isEditing])

    return [isEditing, setEditing]
}