import React from 'react'
import {Toolbar} from "./components/Toolbar/Toolbar"
import {Canvas} from "./components/Canvas/Canvas"
import classes from "./App.module.css";

function App() {
    return (
    <div className={classes.app}>
        <Toolbar />
        <Canvas />
    </div>
  )
}

export {
  App
}
