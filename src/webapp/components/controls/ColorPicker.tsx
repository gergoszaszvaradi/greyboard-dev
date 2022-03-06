import React, { ReactElement } from "react";
import { RgbColorPicker } from "react-colorful";
import Color from "../../../common/utils/color";

import styles from "./ColorPicker.module.scss";

interface ColorPickerProps {
    color: number;
    onInput?: (color: number) => void;
}

const ColorPicker : React.FC<ColorPickerProps> = ({
    color, onInput,
}) : ReactElement => {
    const rgba = Color.UIntToRGBA(color);
    return (
        <RgbColorPicker className={styles.colorPicker} color={{ r: rgba[0], g: rgba[1], b: rgba[2] }} onChange={(newColor) : void => {
            if (onInput)
                onInput(Color.RgbaToUint(newColor.r, newColor.g, newColor.b, 255));
        }} />
    );
};
ColorPicker.defaultProps = {
    onInput: undefined,
};
export default ColorPicker;
