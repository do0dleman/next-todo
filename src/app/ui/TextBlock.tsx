import { HTMLAttributes } from "react"

function TextBlock(props: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLDivElement>) {
    const { children, className, ...rest } = props

    return (
        <div className={`md:text-2xl text-xl children:pb-4 ${className}`} {...rest}>
            {children}
        </div>
    )
}
export default TextBlock