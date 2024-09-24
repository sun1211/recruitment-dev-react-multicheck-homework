import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import MultiCheck from './MultiCheck'; // Adjust the import path according to your project structure
import '@testing-library/jest-dom/extend-expect';

describe('MultiCheck Component', () => {
    const options = [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'},
        {label: 'Option 3', value: '3'}
    ];

    it('renders correctly with initial props', () => {
        render(<MultiCheck label='Test Label' options={options} />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        options.forEach((option) => {
            expect(screen.getByLabelText(option.label)).toBeInTheDocument();
        });
        expect(screen.getByLabelText('Select All')).toBeInTheDocument();
    });

    it('handles select all option correctly', () => {
        const onChange = jest.fn();
        render(<MultiCheck label='Test Label' options={options} onChange={onChange} />);
        const selectAllCheckbox = screen.getByLabelText('Select All');
        fireEvent.click(selectAllCheckbox); // Simulate clicking select all
        expect(onChange).toHaveBeenCalledWith(options); // Expects all options to be passed to onChange
    });

    it('handles individual option correctly', () => {
        const onChange = jest.fn();
        render(<MultiCheck label='Test Label' options={options} onChange={onChange} />);
        const optionCheckbox = screen.getByLabelText('Option 1');
        fireEvent.click(optionCheckbox);
        expect(onChange).toHaveBeenCalledWith([{label: 'Option 1', value: '1'}]);
    });

    it('checks interaction between select all and individual options', () => {
        const onChange = jest.fn();
        render(<MultiCheck label='Test Label' options={options} onChange={onChange} />);
        const selectAllCheckbox = screen.getByLabelText('Select All');
        const optionCheckbox = screen.getByLabelText('Option 2');
        fireEvent.click(selectAllCheckbox); // Select all options
        fireEvent.click(optionCheckbox); // Deselect one option
        expect(onChange).toHaveBeenCalledWith([
            {label: 'Option 1', value: '1'},
            {label: 'Option 3', value: '3'}
        ]); // Expects all except the deselected option to be passed to onChange
    });

    it('renders correct number of columns when multiple columns specified', () => {
        render(<MultiCheck label='Test Label' options={options} columns={3} />);
        const columns = screen.getAllByText(/Option/);
        expect(columns).toHaveLength(3); // Expects three columns as specified
    });
});
