import {createAtom} from '@reatom/core'

enum Tool {
    RECTANGLE = 'RECTANGLE',
    TRIANGLE = 'TRIANGLE',
    CIRCLE = 'CIRCLE'
}

const selectedToolAtom = createAtom(
{
        changeTool: (tool: Tool) => tool,
    },
    ({ onAction, schedule }, state = Tool.RECTANGLE) => {
        onAction('changeTool', (tool) => {
            state = tool
        })

        return state
    },
)

export {
    selectedToolAtom,
    Tool
}