import { MouseEventHandler } from "react"
import { FaFolder, FaList } from "react-icons/fa"

function MobileSectionPicker({ onFolderClick, onTodosClick, }: {
    onFolderClick: MouseEventHandler<HTMLButtonElement>,
    onTodosClick: MouseEventHandler<HTMLButtonElement>,
}) {
    return (
        <div className="bg-front flex md:hidden">
            <SectionButton onClick={onFolderClick}>
                <span className="self-center"><FaFolder /></span > Folders
            </SectionButton>
            <SectionButton onClick={onTodosClick}>
                <span className="self-center"><FaList /></span> Todos
            </SectionButton>
        </div>
    )
}

function SectionButton(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLButtonElement>) {

    const { children, ...rest } = props

    return (
        <button className="flex-grow flex justify-center gap-2 py-3 last:border-l first:border-r
        w-1/2"
            {...rest}
        >
            {children}
        </button>
    )
}
export default MobileSectionPicker