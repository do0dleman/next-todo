"use client";

import Link from "next/link"
import { useState } from "react";
import { ScaleLoader as Loader } from "react-spinners"

function SeeTodosButton() {
    const [isClicked, setClicked] = useState(false)
    return (
        <Link href="/todos" className="rounded bg-active-gradient px-6 py-3 text-lg mt-6 
        hover:shadow-[0px_0px_5px_2px_#7A44CF] hover:-translate-y-1/4 transition-all duration-300
        flex items-center justify-center gap-2 min-w-[12rem]"
            onClick={() => setClicked(true)}
        >
            See todos
            {isClicked ? <Loader color="#fff" height={20} /> : <></>}
        </Link>
    )
}
export default SeeTodosButton