"use client";

import { useEffect, useMemo, useRef, useState } from "react"
import useScroll from "../hooks/useScroll";

type AnimateTextProps = {
    text: string,
    duration?: number,
    brPositions?: number[]
}
function AnimateText({ text, duration = 50, brPositions }: AnimateTextProps) {

    const [displayText, setDisplayText] = useState('')
    const indexRef = useRef<number>(0)
    const [isFinished, setFinished] = useState(false)

    const whitespaceIndecies = useMemo(() => {
        const whitespaces: number[] = []
        text.split('').forEach((char, i) => {
            if (char === ' ') return whitespaces.push(i)
        })
        return whitespaces
    }, [])

    let placeholderText = text
    if (brPositions) {
        let offset = 0
        brPositions.forEach(pos => {
            placeholderText = [placeholderText.slice(0, whitespaceIndecies[pos - 1]! + offset),
                '<br />',
            placeholderText.slice(whitespaceIndecies[pos - 1]! + offset)].join('');
            offset += '<br />'.length
        })
    }

    const textRef = useRef<HTMLDivElement>(null)
    const scroll = useScroll()
    const isStartedRef = useRef(false)

    useEffect(() => {
        if (textRef.current !== null && !isStartedRef.current) {
            const boundingRect = textRef.current.getBoundingClientRect()
            if (boundingRect.y + boundingRect.height > window.innerHeight) {
                return
            }
        }
        isStartedRef.current = true
        if (indexRef.current >= text.length) {
            setFinished(true)
            return
        }
        const timeout = setTimeout(() => {
            let addString = ''
            if (brPositions) {
                brPositions.forEach(pos => {
                    if (indexRef.current === whitespaceIndecies[pos - 1]! + 1) {
                        addString += '<br />'
                    }
                })
            }
            addString += text[indexRef.current]
            console.log(addString)
            setDisplayText(displayText + addString)
            indexRef.current++
        }, duration)

        return () => clearTimeout(timeout)
    }, [displayText, isStartedRef.current ? null : scroll])

    return (
        <>
            <div className="relative text-transparent p-inherit select-none" ref={textRef}>
                <span className="w-full block" dangerouslySetInnerHTML={{
                    __html: placeholderText
                }} />

                <span className={`absolute w-[105%] top-0 left-0 text-mainel z-[1] 
                after:content-['|'] after:text-active select-text
                ${isFinished ? 'after:animate-blink' : ''}`}
                    dangerouslySetInnerHTML={{
                        __html: displayText
                    }}
                >
                </span>
            </div>
        </>
    )
}
export default AnimateText