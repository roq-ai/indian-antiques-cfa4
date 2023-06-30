import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAuthenticationById, updateAuthenticationById } from 'apiSdk/authentications';
import { Error } from 'components/error';
import { authenticationValidationSchema } from 'validationSchema/authentications';
import { AuthenticationInterface } from 'interfaces/authentication';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { MarketplaceInterface } from 'interfaces/marketplace';
import { UserInterface } from 'interfaces/user';
import { getMarketplaces } from 'apiSdk/marketplaces';
import { getUsers } from 'apiSdk/users';

function AuthenticationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AuthenticationInterface>(
    () => (id ? `/authentications/${id}` : null),
    () => getAuthenticationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AuthenticationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAuthenticationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/authentications');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AuthenticationInterface>({
    initialValues: data,
    validationSchema: authenticationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Authentication
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<MarketplaceInterface>
              formik={formik}
              name={'marketplace_id'}
              label={'Select Marketplace'}
              placeholder={'Select Marketplace'}
              fetcher={getMarketplaces}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'authenticator_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'authentication',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AuthenticationEditPage);
