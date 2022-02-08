import classes from "./Toolbar.module.css"
import {BiRectangle} from 'react-icons/bi'
import {VscCircleLargeOutline} from 'react-icons/vsc'
import {IoTriangleOutline} from 'react-icons/io5'
import {Button_Icon} from "../../uikit/Button/Button_Icon"
import {useAtom} from "@reatom/react";
import {selectedToolAtom, Tool} from "../../model/tools"

const ICON_SIZE = 30
const SELECTED_ICON_COLOR = 'gold'
const DEFAULT_ICON_COLOR = 'white'

function Toolbar() {
    const [tool, {changeTool}] = useAtom(selectedToolAtom)

    const buttons = [
        {
            id: 'rectangle',
            icon: () => (
                <BiRectangle
                    size={ICON_SIZE}
                    color={tool === 'RECTANGLE' ? SELECTED_ICON_COLOR : DEFAULT_ICON_COLOR}
                />
            ),
            onClick: () => changeTool(Tool.RECTANGLE),
        },
        {
            id: 'circle',
            icon: () => (
                <VscCircleLargeOutline
                    size={ICON_SIZE}
                    color={tool === 'CIRCLE' ? SELECTED_ICON_COLOR : DEFAULT_ICON_COLOR}
                />
            ),
            onClick: () => changeTool(Tool.CIRCLE),
        },
        {
            id: 'triangle',
            icon: () => (
                <IoTriangleOutline
                    size={ICON_SIZE}
                    color={tool === 'TRIANGLE' ? SELECTED_ICON_COLOR : DEFAULT_ICON_COLOR}
                />
            ),
            onClick: () => changeTool(Tool.TRIANGLE),
        }
    ]

    return (
        <div className={classes.toolbar}>
            {buttons.map(b => (
                <Button_Icon
                    key={b.id}
                    Icon={b.icon}
                    onClick={b.onClick}
                />
            ))}
        </div>
    )
}

export {
    Toolbar
}