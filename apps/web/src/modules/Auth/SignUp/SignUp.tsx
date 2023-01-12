import React from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Select,
  createStyles,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { AlertTriangle, FaceIdError, MoodHappy } from 'tabler-icons-react';
import { countries, flag, name } from 'country-emoji';

import { SignUpMutation } from './__generated__/SignUpMutation.graphql';

import useStore from 'src/store/';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  email: string;
  password: string;
}

const initialValues: SignUpFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  country: '',
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  phone: Yup.string().required('Phone is required'),
  country: Yup.string().required('Country is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const useStyles = createStyles((theme) => ({
  title: {
    letterSpacing: '-.040em',
    textIndent: '-0.020em',
  },
  text: {
    letterSpacing: '-.016em',
  },
  invalid: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors.red[8], 0.15)
        : theme.colors.red[0],
  },
  icon: {
    color: theme.colors.red[theme.colorScheme === 'dark' ? 7 : 6],
  },
}));

const AdminSignUp = graphql`
  mutation SignUpMutation($input: AdminSignUpInput!) {
    AdminSignUp(input: $input) {
      ... on MutationAdminSignUpSuccess {
        data {
          admin {
            id
            firstName
            lastName
            email
            country
            phone
          }
          token
        }
      }
      ... on Error {
        message
      }
    }
  }
`;

const SignUp = () => {
  const [commitMutation, isInFlight] = useMutation<SignUpMutation>(AdminSignUp);
  const onUpdateToken = useStore((state) => state.onUpdateToken);
  const { classes } = useStyles();
  const navigate = useNavigate();

  const countriesArray = Object.keys(countries);

  const countriesArrayItems = countriesArray.map((country: any) => {
    return {
      value: `${name(country)}`,
      label: `${flag(country)} ${name(country)}`,
    };
  });

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} align="center">
        Create account
      </Title>
      <Text className={classes.text} color="dimmed" align="center" mt={5}>
        Do you already have an account?{' '}
        <Anchor component={Link} to="/signin">
          Sign in
        </Anchor>
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnMount={true}
        onSubmit={(
          values: SignUpFormValues,
          actions: FormikHelpers<SignUpFormValues>,
        ) => {
          commitMutation({
            variables: {
              input: {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                country: values.country,
                email: values.email,
                password: values.password,
              },
            },
            onCompleted({ AdminSignUp }, errors) {
              // We should check if there was an error and display it.
              if (AdminSignUp.message) {
                showNotification({
                  title: 'Something went wrong. Please try again.',
                  message:
                    'If the problem persists, come back later and try again. If you wish, feel free to contact our customer support.',
                  color: 'red',
                  icon: <FaceIdError />,
                });
              }

              // We should redirect to the dashboard.
              if (AdminSignUp.data) {
                onUpdateToken(
                  AdminSignUp.data.token,
                  AdminSignUp.data.admin.id,
                );
                showNotification({
                  title: 'Sign up successful',
                  message: 'You created an account successfully',
                  color: 'green',
                  icon: <MoodHappy />,
                });
                navigate('/bets');
              }

              actions.setSubmitting(false);
            },
            onError(error) {
              showNotification({
                title: 'Something went wrong. Please try again.',
                message:
                  'If the problem persists, come back later and try again. If you wish, feel free to contact our customer support.',
                color: 'red',
                icon: <FaceIdError />,
              });
              actions.setSubmitting(false);
            },
          });
        }}
      >
        {(props: FormikProps<SignUpFormValues>) => (
          <Form onSubmit={props.handleSubmit}>
            <Paper withBorder shadow="md" p={30} mt={30}>
              <TextInput
                variant="filled"
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstName}
                name="firstName"
                label="First name"
                type="text"
                placeholder="First name"
                required
                error={props.touched.firstName && props.errors.firstName}
                classNames={{
                  input:
                    props.touched.firstName && props.errors.firstName
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.firstName && props.errors.firstName ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <TextInput
                variant="filled"
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
                name="lastName"
                label="Last name"
                type="text"
                placeholder="Last name"
                required
                mt="md"
                error={props.touched.lastName && props.errors.lastName}
                classNames={{
                  input:
                    props.touched.lastName && props.errors.lastName
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.lastName && props.errors.lastName ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <Select
                variant="filled"
                size="md"
                onChange={(value: string) => {
                  props.setFieldValue('country', value);
                }}
                onBlur={props.handleBlur}
                value={props.values.country}
                label="Country"
                placeholder="Select your country"
                searchable
                nothingFound="No options"
                data={countriesArrayItems}
                required
                mt="md"
                error={props.touched.country && props.errors.country}
                classNames={{
                  input:
                    props.touched.country && props.errors.country
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.country && props.errors.country ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <TextInput
                variant="filled"
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone}
                name="phone"
                label="Phone"
                type="text"
                placeholder="+000 0000000"
                required
                mt="md"
                error={props.touched.phone && props.errors.phone}
                classNames={{
                  input:
                    props.touched.phone && props.errors.phone
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.phone && props.errors.phone ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <TextInput
                variant="filled"
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                label="Email"
                type="email"
                placeholder="you@mantine.dev"
                required
                mt="md"
                error={props.touched.email && props.errors.email}
                classNames={{
                  input:
                    props.touched.email && props.errors.email
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.email && props.errors.email ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <PasswordInput
                variant="filled"
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                label="Password"
                type="password"
                placeholder="Your password"
                required
                mt="md"
                error={props.touched.password && props.errors.password}
                classNames={{
                  input:
                    props.touched.password && props.errors.password
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.password && props.errors.password ? (
                    <AlertTriangle size={16} className={classes.icon} />
                  ) : undefined
                }
              />

              <Group position="apart" mt="md">
                <Checkbox label="Remember me" size="md" />
                <Anchor component={Link} to="/forgot" size="md">
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                type="submit"
                size="md"
                fullWidth
                mt="md"
                loading={isInFlight}
                disabled={props.isValid === false}
              >
                Sign up
              </Button>
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUp;
