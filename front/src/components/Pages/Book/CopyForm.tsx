
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

import { Input, PasswordInput, Select } from '../../FormElements'

