import { useCallback, useEffect, useState } from "react";

export default function useScroll() {
    const [scrollY, setScrollY] = useState(0);

    const onScroll = useCallback(() => {
        const { scrollY } = window;
        // console.log("yOffset", pageYOffset, "scrollY", scrollY);
        setScrollY(scrollY);
    }, []);

    useEffect(() => {
        //add eventlistener to window
        window.addEventListener("scroll", onScroll);
        // remove event on unmount to prevent a memory leak with the cleanup
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    return scrollY
}