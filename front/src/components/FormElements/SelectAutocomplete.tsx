
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { useState } from 'react'
import ElementFormControl from "./ElementFormControl";

const SelectAutocomplete = ({ name, label, error = null, isRequired = false, options, ...rest }) => {
    return (
        <ElementFormControl
            label={label}
            name={name}
            error={error}
            isRequired={isRequired}
        >
            <AutoComplete openOnFocus>
                <AutoCompleteInput {...rest} />
                <AutoCompleteList>
                    {options.map((option, cid) => (
                        <AutoCompleteItem
                            key={`option-${cid}`}
                            value={option}
                            textTransform="capitalize"
                        >
                            {option}
                        </AutoCompleteItem>
                    ))}
                </AutoCompleteList>
            </AutoComplete>
        </ElementFormControl>
    )
}

export { SelectAutocomplete }