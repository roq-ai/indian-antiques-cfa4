import * as yup from 'yup';

export const authenticationValidationSchema = yup.object().shape({
  status: yup.string().required(),
  marketplace_id: yup.string().nullable(),
  authenticator_id: yup.string().nullable(),
});
