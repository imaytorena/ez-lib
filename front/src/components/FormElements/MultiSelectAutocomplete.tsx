import { CUIAutoComplete } from 'chakra-ui-autocomplete'
import { useState } from 'react';
import ElementFormControl from './ElementFormControl';


export interface Item {
    label: string;
    value: string;
}

const MultiSelectAutocomplete = ({ name, label, error = null, isRequired = false, options, ...rest }) => {
    const [pickerItems, setPickerItems] = useState(options);
    const [selectedItems, setSelectedItems] = useState<Item[]>([]);

    // const handleCreateItem = (item: Item) => {
    //     setPickerItems((curr) => [...curr, item]);
    //     setSelectedItems((curr) => [...curr, item]);
    // };

    const handleSelectedItemsChange = (selectedItems?: Item[]) => {
        if (selectedItems) {
            setSelectedItems(selectedItems);
        }
    };
    return (
        <ElementFormControl
            label={label}
            name={name}
            error={error}
            isRequired={isRequired}
        >
            <CUIAutoComplete
                items={pickerItems}
                selectedItems={selectedItems}
                disableCreateItem
                hideToggleButton

                onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
                placeholder={''}
                label={''}
            />
        </ElementFormControl>
    )
}

export { MultiSelectAutocomplete }