import { useEffect, useState } from "react";
import tailwind from "tailwindcss/defaultTheme";

/**
 * Retruns tailwind mediaquery as a string
 * @returns {string} Current minimal active tailwind media query
 */
export default function useMedia() {
    const [media, setMedia] = useState('')

    useEffect(() => {
        const onResize = () => {
            const viewPortWidth = window.innerWidth
            const screens = tailwind.screens

            let breakPoint = ''
            for (const screen in screens) {
                if (+screens[screen as keyof typeof screens].slice(0, -2) <= viewPortWidth) {
                    breakPoint = screen
                }
            }
            setMedia(breakPoint)
        }
        window.addEventListener('resize', onResize)
        onResize()

        return () => { window.removeEventListener('resize', onResize) }
    }, [])

    return media
}