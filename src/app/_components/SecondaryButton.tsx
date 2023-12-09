export default function SecondaryButton(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {

    const { className, children, ...rest } = props

    return (
        <button className={`${className} bg-mainel/5 px-6 py-2 rounded-md hover:bg-mainel/10 active:bg-mainel/20 transition-all duration-300`}
            {...rest}>
            {children}
        </button>
    )
}