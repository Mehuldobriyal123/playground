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
  createStyles,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'tabler-icons-react';
import { useMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { SignInMutation } from './__generated__/SignInMutation.graphql';

interface SignInFormValues {
  email: string;
  password: string;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
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

const AdminSignIn = graphql`
  mutation SignInMutation($input: AdminSignInInput!) {
    AdminSignIn(input: $input) {
      token
      admin {
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

const SignIn = () => {
  const [commitMutation, isPending] = useMutation<SignInMutation>(AdminSignIn);

  const { classes } = useStyles();

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} align="center">
        Welcome back!
      </Title>
      <Text className={classes.text} color="dimmed" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor component={Link} to="/signup">
          Create account
        </Anchor>
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnMount={true}
        onSubmit={(
          values: SignInFormValues,
          actions: FormikHelpers<SignInFormValues>,
        ) => {
          commitMutation({
            variables: {
              input: {
                email: values.email,
                password: values.password,
              },
            },
            onCompleted(response, errors) {
              console.log('response: ', response);
              showNotification({
                title: 'Log in succesfully!',
                message: 'You are now logged in',
              });
            },
            onError(error) {
              console.log('error.message: ', error.message);
              showNotification({
                title: 'Something went wrong!',
                message: error.message,
              });
              actions.setSubmitting(false);
            },
          });
        }}
      >
        {(props: FormikProps<SignInFormValues>) => (
          <Form onSubmit={props.handleSubmit}>
            <Paper withBorder shadow="md" p={30} mt={30}>
              <TextInput
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                label="Email"
                type="email"
                placeholder="you@mantine.dev"
                required
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
                <Checkbox size="md" label="Remember me" />
                <Anchor component={Link} to="/forgot" size="md">
                  Forgot password?
                </Anchor>
              </Group>

              <Button
                type="submit"
                size="md"
                fullWidth
                mt="md"
                loading={isPending}
                disabled={props.isValid === false}
              >
                Sign in
              </Button>
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignIn;
