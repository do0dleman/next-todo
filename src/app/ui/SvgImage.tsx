import { HTMLAttributes } from "react"

function SvgImage(props: React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLDivElement>) {
    const { children, className, ...rest } = props

    return (
        <div className={`children:fill-active flex justify-center items-center 
        flex-grow children:min-w-full children:min-h-full children:h-44 ${className}`} {...rest}>
            {children}
        </div>
    )
}
export default SvgImage