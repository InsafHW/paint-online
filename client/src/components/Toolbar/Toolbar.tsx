import classes from "./Toolbar.module.css"
import {BiRectangle} from 'react-icons/bi'
import {VscCircleLargeOutline} from 'react-icons/vsc'
import {IoTriangleOutline} from 'react-icons/io5'
import {Button_Icon} from "../../uikit/Button/Button_Icon"

const ICON_SIZE = 30
const ICON_COLOR = 'white'

function Toolbar() {
    const buttons = [
        {
            id: 'rectangle',
            icon: () => (
                <BiRectangle
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                />
            ),
            onClick: () => console.log('rectangle'),
        },
        {
            id: 'circle',
            icon: () => (
                <VscCircleLargeOutline
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                />
            ),
            onClick: () => console.log('cirlce'),
        },
        {
            id: 'triangle',
            icon: () => (
                <IoTriangleOutline
                    size={ICON_SIZE}
                    color={ICON_COLOR}
                />
            ),
            onClick: () => console.log('triangle'),
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