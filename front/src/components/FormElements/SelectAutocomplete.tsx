
import { Icon, InputGroup, InputRightElement } from "@chakra-ui/react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteInputProps,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { FieldError } from "react-hook-form";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { HeaderRow, Row } from "../../constants";
import { ElementFormControl } from "./ElementFormControl";

{/* <SelectAutocomplete
    name="book_id"
    label="Libro"
    // error={any}
    isRequired
    options={[
        "Hola 1 (ISBN: 1)",
        "Hola (ISBN: 2)",
        "Hola 212 (ISBN: 3)",
        "Hola 132 (ISBN: 20)",
        "Hola 12a (ISBN: 100)",
        "Hola 5 (ISBN: 101)",
        "Hola 1552 (ISBN: 200)",
    ]}
/> */}

interface SelectAutocompleteProps extends AutoCompleteInputProps {
    name: string;
    label?: string;
    isRequired?: boolean;
    disabled?: boolean;
    options: string[];
    ref?: React.LegacyRef<HTMLInputElement>;
    error?: FieldError;
}
const SelectAutocompleteBase: ForwardRefRenderFunction<HTMLInputElement, SelectAutocompleteProps> = (
    { name, label, error = null, isRequired = false, options, ...rest },
    ref
) => {
    return (
        <ElementFormControl
            label={label}
            name={name}
            error={error}
            isRequired={isRequired}
        >
            <AutoComplete openOnFocus>
                {({ isOpen }) => (
                    <>
                        <InputGroup>
                            <AutoCompleteInput variant="filled" placeholder="Search..." />
                            <InputRightElement>
                                <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                            </InputRightElement>
                        </InputGroup>
                        <AutoCompleteList>
                            {options.map((option, index) => (
                                <AutoCompleteItem
                                    key={`option-${index}`}
                                    value={option}
                                    textTransform="capitalize"
                                >
                                    {option}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                    </>
                )}
            </AutoComplete>
        </ElementFormControl>
    )
}

export const SelectAutocomplete = forwardRef(SelectAutocompleteBase);