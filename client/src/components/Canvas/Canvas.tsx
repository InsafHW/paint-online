import classes from './Canvas.module.css'
import {useAtom} from "@reatom/react";
import {selectedToolAtom} from "../../model/tools";
import {useEffect, useRef} from "react";

function Canvas() {
    const [tool] = useAtom(selectedToolAtom)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mousePressed = useRef(false)

    useEffect(() => {
        if (!canvasRef.current) return

        const listeners = {
            onMouseDownHandler: (e: MouseEvent) => {
                mousePressed.current = true
                console.log(e, tool)
            },
            onMouseMoveHandler: (e: MouseEvent) => {
                if (mousePressed.current) {
                    console.log(e, tool)
                }
            },
            onMouseUpHandler: (e: MouseEvent) => {
                console.log(e, tool)
                mousePressed.current = false
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