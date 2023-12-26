export default function Title1(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLHeadingElement>) {

    const { className, children, ...rest } = props

    return (
        <h1 className={`text-4xl md:text-6xl py-12 text-center md:text-left leading-snug ${className}`} {...rest}>
            {children}
        </h1>
    )
}