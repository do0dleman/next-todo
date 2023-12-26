import { HTMLAttributes } from "react"

function SectionContainer(props: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLDivElement>) {
    const { children, className, ...rest } = props

    return (
        <div className={`container m-auto flex flex-col md:flex-row px-2 ${className}`} {...rest}>
            {children}
        </div>
    )
}
export default SectionContainer