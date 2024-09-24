import React, {FC, memo, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Option} from './MultiCheck';

type OptionProps = {
    option: Option;
    checked: boolean;
    onChange: (checked: boolean, option: Option) => void;
};

/**
 * Renders a checkbox option that can be toggled on and off.
 * This component is typically used within a list or group of selectable items,
 * allowing the user to make multiple selections. The component's state reflects
 * whether it is currently checked, and it will re-render when its checked state changes.
 *
 * @param {Option} option - The data object containing the label and value for the checkbox.
 * @param {boolean} checked - Initial checked state of the checkbox.
 * @param {(checked: boolean, option: Option) => void} onChange - Callback function that is called when the checkbox state changes, passing the new state and option data.
 * @return {JSX.Element} - The rendered checkbox component.
 * @example
 *
 * <CheckOption
 *   option={{ label: "Option 1", value: "1" }}
 *   checked={true}
 *   onChange={(isChecked, option) => console.log("Checked:", isChecked, "Option:", option)}
 * />
 */
const CheckOption: FC<OptionProps> = memo(({option, checked, onChange}) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    // If the option's value is unique and stable, consider using it directly.
    // Otherwise, if the UUID is truly necessary and you worry about re-creating it
    // often, consider using useRef and only setting it once on component mount.
    const inputId = `checkbox-${option.value}`;

    return (
        <OptionLayout>
            <input
                id={inputId}
                type='checkbox'
                checked={isChecked}
                onChange={(e) => onChange(e.target.checked, option)}
            />
            <label htmlFor={inputId}>{option.label}</label>
        </OptionLayout>
    );
});

export default CheckOption;

const OptionLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 4px 0;
    input {
        flex: 0 0 auto;
        margin-right: 4px;
        width: 16px;
        height: 16px;
    }
    label {
        flex: 1;
    }
`;
