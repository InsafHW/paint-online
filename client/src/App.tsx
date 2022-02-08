import React from 'react'
import {Toolbar} from "./components/Toolbar/Toolbar"
import {Canvas} from "./components/Canvas/Canvas"
import classes from "./App.module.css"
import {createStore} from "@reatom/core"
import {reatomContext} from '@reatom/react'

function App() {
    const store = createStore()

    return (
    <div className={classes.app}>
        <reatomContext.Provider value={store}>
            <Toolbar />
            <Canvas />
        </reatomContext.Provider>
    </div>
  )
}

export {
  App
}
