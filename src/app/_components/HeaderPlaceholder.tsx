import Link from "next/link"

function HeaderPlaceholder() {


    return (
        <header className="h-20 px-8 flex justify-between align-middle w-full opacity-0">
            <h2 className="text-4xl">
                <Link href="/">TODOs</Link>
            </h2>

            <div className="flex align-middle space-x-4 ">

            </div>
        </header>
    )
}
export default HeaderPlaceholder