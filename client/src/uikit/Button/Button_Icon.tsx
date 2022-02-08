import classes from "./Button_Icon.module.css";
import {IconType} from "react-icons";

type Button_IconProps = {
    Icon: IconType,
    onClick: () => void,
}

function Button_Icon({
    Icon,
    onClick,
}: Button_IconProps) {
    return (
        <button
            className={classes.button}
            onClick={onClick}
        >
            <Icon />
        </button>
    )
}

export {
    Button_Icon,
}