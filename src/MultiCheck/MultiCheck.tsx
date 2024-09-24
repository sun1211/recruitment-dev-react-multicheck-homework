import React, {FC, memo, useCallback, useEffect, useMemo} from 'react';
import {Card} from '../components/Card/Card';
import useChunk from '../hooks/useChunk';
import useSet from '../hooks/useSet';
import {isArrayEqual} from '../utils/isArrayEqual/isArrayEqual';
import styled from 'styled-components';
import CheckOption from './CheckOption';

export type Option = {
    label: string;
    value: string;
    isSelectAll?: boolean;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. All the options (including the "Select All") should be split into several columns, and the order is from top to bottom in each column
 */
type Props = {
    // the label text of the whole component
    label?: string;
    // Assume no duplicated labels or values
    // It may contain any values, so be careful for you "Select All" option
    options: Option[];
    // Always be non-negative integer.
    // The default value is 1
    // 0 is considered as 1
    // We only check [0, 1, 2, ... 10], but it should work for greater number
    columns?: number;
    // Which options should be selected.
    // - If `undefined`, makes the component in uncontrolled mode with no default options checked, but the component is still workable;
    // - if not undefined, it's considered as the default value to render the component. And when it changes, it will be considered as the NEW default value to render the component again
    // - Assume no duplicated values.
    // - It may contain values not in the options.
    values?: string[];
    // if not undefined, when checked options are changed, they should be passed to outside
    // if undefined, the options can still be selected, but won't notify the outside
    onChange?: (options: Option[]) => void;
};

const createSelectAllOption = (): Option => ({
    label: 'Select All',
    value: 'SelectAll',
    isSelectAll: true
});

function isSelectAllOption(option: Option) {
    return 'isSelectAll' in option;
}

const selectAllOption = createSelectAllOption();

/**
 * A MultiCheck component that allows selecting multiple options, including a 'Select All' functionality.
 * The component is designed to handle multiple selection options displayed in a flexible column layout, controlled by props.
 * It supports controlled and uncontrolled modes through optional 'values' props and notifies changes via an 'onChange' callback.
 *
 * @param {Props} props - The properties passed to the MultiCheck component.
 * @param {string} props.label - Label text displayed at the top of the component.
 * @param {Option[]} props.options - Array of options that the user can select from.
 * @param {number} props.columns - Determines the number of columns to display the options in. Defaults to 1 if not specified.
 * @param {string[]} props.values - An array of option values that are currently selected. If undefined, the component operates in an uncontrolled mode.
 * @param {(options: Option[]) => void} props.onChange - Callback function that is called when the selection changes. It passes the current selection state.
 * @returns {JSX.Element} The rendered MultiCheck component.
 *
 * @example
 * <MultiCheck
 *   label="Select Your Options"
 *   options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]}
 *   columns={2}
 *   values={['1']}
 *   onChange={(selectedOptions) => console.log(selectedOptions)}
 * />
 */
const MultiCheck: FC<Props> = memo((props): JSX.Element => {
    const options = useMemo(() => (props.options.length ? [selectAllOption, ...props.options] : []), [props.options]);

    const chunks = useChunk(options, props.columns);

    const [
        checkedValue,
        { add: addCheckedValue, remove: removeCheckedValue, set: setCheckedValue }
    ] = useSet(useMemo(() => new Set<string>(props.values || []), [props.values]));
    
    // Set the checked values whenever `props.values` changes
    useEffect(() => {
        if (props.values) setCheckedValue(props.values);
    }, [props.values, setCheckedValue]);
    
    // Memoized list of checked options
    const checkedOptions = useMemo(
        () => props.options.filter((option) => checkedValue.has(option.value)),
        [props.options, checkedValue]
    );
    
    // Simplified isChecked using `Set.has` for efficiency
    const isChecked = useCallback(
        (option: Option) => checkedValue.has(option.value),
        [checkedValue]
    );
    
    // Handle option change (add/remove)
    const onOptionChange = useCallback(
        (checked: boolean, option: Option) => {
            checked ? addCheckedValue(option.value) : removeCheckedValue(option.value);
        },
        [addCheckedValue, removeCheckedValue]
    );
    
    // Handle onChange callback
    useEffect(() => {
        if (props.onChange && !isArrayEqual(props.values || [], Array.from(checkedValue))) {
            props.onChange(checkedOptions);
        }
    }, [props.onChange, props.values, checkedValue, checkedOptions]);
    

    const allOptionValues = useMemo(() => props.options.map(option => option.value), [props.options]);

    const isAllChecked = useMemo(() => {
        return allOptionValues.every(value => checkedValue.has(value));
    }, [checkedValue, allOptionValues]);

    // Optimized onSelectAllOptionChange
    const onSelectAllOptionChange = useCallback(
        (checked: boolean) => {
            setCheckedValue(checked ? allOptionValues : []);
        },
        [allOptionValues, setCheckedValue]
    );

    return (
        <div className='MultiCheck'>
            <Card title={props.label}>
                <Panel>
                    {chunks.map((chunk, index) => (
                        <GroupColumn key={index}>
                            {chunk.map((option) => {
                                const optionIsSelectAll = isSelectAllOption(option);
                                const checked = optionIsSelectAll ? isAllChecked : isChecked(option);
    
                                return (
                                    <CheckOption
                                        key={option.value}
                                        option={option}
                                        checked={checked}
                                        onChange={optionIsSelectAll ? onSelectAllOptionChange : onOptionChange}
                                    />
                                );
                            })}
                        </GroupColumn>
                    ))}
                </Panel>
            </Card>
        </div>
    );
});

export default MultiCheck;

const Panel = styled.div`
    display: flex;
    padding: 8px;
    background-color: #fff;
`;

const GroupColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 0;
    margin-right: 8px;
    &:last-child {
        margin-right: 0;
    }
`;
