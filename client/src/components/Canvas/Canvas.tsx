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

    const drawRectangle = useCallback((ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        ctx.beginPath()
        const currentPosition = getMousePosition(e)
        const width = currentPosition.x - startPosition.current.x
        const height = currentPosition.y - startPosition.current.y
        ctx.clearRect(0, 0, 800, 600)
        ctx.rect(startPosition.current.x, startPosition.current.y, width, height)
        ctx.stroke()
        ctx.closePath()
    }, [])

    const drawCircle = useCallback((ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        ctx.beginPath()
        const currentPosition = getMousePosition(e)
        const centerX = startPosition.current.x + (currentPosition.x - startPosition.current.x) / 2
        const centerY = startPosition.current.y + (currentPosition.y - startPosition.current.y) / 2
        const radius = Math.abs(((currentPosition.x - startPosition.current.x) / 2))
        ctx.clearRect(0, 0, 800, 600)
        ctx.arc(centerX, centerY, radius, 0, 360)
        ctx.stroke()
        ctx.closePath()
    }, [])

    const drawTriangle = useCallback((ctx: CanvasRenderingContext2D, e: MouseEvent) => {
        ctx.beginPath()
        const currentPosition = getMousePosition(e)
        const left = {
            x: startPosition.current.x,
            y: currentPosition.y
        }
        const top = {
            x: startPosition.current.x + (currentPosition.x - startPosition.current.x) / 2,
            y: startPosition.current.y
        }
        const right = {
            x: currentPosition.x,
            y: currentPosition.y
        }
        ctx.clearRect(0, 0, 800, 600)
        ctx.moveTo(left.x, left.y)
        ctx.lineTo(top.x, top.y)
        ctx.lineTo(right.x, right.y)
        ctx.closePath()
        ctx.stroke()
    }, [])

    useEffect(() => {
        if (!canvasRef.current) return

        const listeners = {
            onMouseDownHandler: (e: MouseEvent) => {
                if (!canvasRef.current) return
                mousePressed.current = true
                startPosition.current = getMousePosition(e)
            },
            onMouseMoveHandler: (e: MouseEvent) => {
                if (mousePressed.current && canvasRef.current) {
                    const ctx = canvasRef.current.getContext('2d')
                    if (ctx) {
                        switch (tool) {
                            case 'RECTANGLE':
                                drawRectangle(ctx, e)
                                break
                            case 'CIRCLE':
                                drawCircle(ctx, e)
                                break
                            case 'TRIANGLE':
                                drawTriangle(ctx, e)
                                break
                        }
                    }
                }
            },
            onMouseUpHandler: (e: MouseEvent) => {
                mousePressed.current = false
                endPosition.current = getMousePosition(e)
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
