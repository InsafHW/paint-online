import classes from './Canvas.module.css'
import {useAtom} from "@reatom/react";
import {selectedToolAtom} from "../../model/tools";
import {useCallback, useEffect, useRef, useState} from "react";

function Canvas() {
    const [tool] = useAtom(selectedToolAtom)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mousePressed = useRef(false)
    const startPosition = useRef({
        x: 0,
        y: 0
    })
    const endPosition = useRef({
        x: 0,
        y: 0
    })

    const getMousePosition = useCallback((e: MouseEvent) => {
        let top = 0, left = 0
        if (canvasRef.current) {
            const bounding = canvasRef.current.getBoundingClientRect()
            top = bounding.top
            left = bounding.left
        }
        return {
            x: e.clientX - left,
            y: e.clientY - top
        }
    }, [canvasRef])

    useEffect(() => {
        if (!canvasRef.current) return

        const listeners = {
            onMouseDownHandler: (e: MouseEvent) => {
                if (!canvasRef.current) return
                const {top, left} = canvasRef.current.getBoundingClientRect()
                mousePressed.current = true
                startPosition.current = getMousePosition(e)
                console.log(startPosition.current)
            },
            onMouseMoveHandler: (e: MouseEvent) => {
                if (mousePressed.current) {
                    console.log(e, tool)
                }
            },
            onMouseUpHandler: (e: MouseEvent) => {
                console.log(e, tool)
                mousePressed.current = false
                endPosition.current = getMousePosition(e)
                console.log(endPosition.current)
            }
        }

        canvasRef.current.addEventListener('mousedown', listeners.onMouseDownHandler)
        canvasRef.current.addEventListener('mousemove', listeners.onMouseMoveHandler)
        canvasRef.current.addEventListener('mouseup', listeners.onMouseUpHandler)
        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeEventListener('mousedown', listeners.onMouseDownHandler)
                canvasRef.current.removeEventListener('mousemove', listeners.onMouseMoveHandler)
                canvasRef.current.removeEventListener('mouseup', listeners.onMouseUpHandler)
            }
        }
    }, [tool])

    return (
        <div className={classes.canvasContainer}>
            <canvas
                className={classes.canvas}
                width={800}
                height={600}
                ref={canvasRef}
            />
        </div>
    )
}

export {
    Canvas
}