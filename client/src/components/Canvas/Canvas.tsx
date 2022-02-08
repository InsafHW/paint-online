import classes from './Canvas.module.css'

function Canvas() {
    return (
        <div className={classes.canvasContainer}>
            <canvas
                className={classes.canvas}
                width={800}
                height={600}
            />
        </div>
    )
}

export {
    Canvas
}