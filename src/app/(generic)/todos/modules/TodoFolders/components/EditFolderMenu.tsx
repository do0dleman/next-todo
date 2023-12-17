import { MouseEventHandler } from "react"
import DeleteButton from "~/app/ui/EditMenu/DeleteButton"
import EditButton from "~/app/ui/EditMenu/EditButton"
import EditMenu from "~/app/ui/EditMenu/EditMenu"

type EditTodoMenuProps = {
    HandleDeleteClick: MouseEventHandler<HTMLButtonElement>,
    HandleEditClick: MouseEventHandler<HTMLButtonElement>,
}

function EditFolderMenu(props: EditTodoMenuProps) {
    const { HandleDeleteClick, HandleEditClick } = props

    return (
        <EditMenu>
            <EditButton HandleEditClick={HandleEditClick} />
            <DeleteButton HandleDeleteClick={HandleDeleteClick} />
        </EditMenu>
    )
}
export default EditFolderMenu