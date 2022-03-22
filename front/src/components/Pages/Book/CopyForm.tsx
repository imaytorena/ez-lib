
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    HStack,
    useToast
} from '@chakra-ui/react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { User } from '../../../constants';
import { userService } from '../../../services';

import { Input, MultiSelectAutocomplete, PasswordInput, Select, SelectAutocomplete } from '../../FormElements'
import CopiesTableForm from './CopiesTableForm';

const CopyForm = ({ book }) => {
    const [copiesState, setCopiesState] = useState([]);
    const [copiesNumberState, setCopiesNumberState] = useState(null);
    return (
        <>
        <MultiSelectAutocomplete
        name="book_id"
        label="Libro"
        // error={any}
        isRequired
        options={[
            {value: "1", label: "Hola 1 (ISBN: 1)"},
            {value: "2", label: "Hola (ISBN: 2)"},
            {value: "3", label: "Hola 212 (ISBN: 3)"},
            {value: "4", label: "Hola 132 (ISBN: 20)"},
            {value: "5", label: "Hola 12a (ISBN: 100)"},
            {value: "6", label: "Hola 5 (ISBN: 101)"},
            {value: "7", label: "Hola 1552 (ISBN: 200)"},
        ]}
        />
            <CopiesTableForm
                copies={copiesNumberState}
                copiesState={copiesState}
                setCopiesState={setCopiesState}
            />
        </>
    )
}

export default CopyForm