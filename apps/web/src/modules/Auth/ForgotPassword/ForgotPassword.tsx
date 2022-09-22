import React from 'react';
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, AlertTriangle } from 'tabler-icons-react';

interface ForgotPasswordFormValues {
  email: string;
}

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
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

const ForgotPassword = () => {
  const { classes } = useStyles();

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text className={classes.text} color="dimmed" align="center" mt={5}>
        Enter your email to get a reset link
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnMount={true}
        onSubmit={(values: ForgotPasswordFormValues, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props: FormikProps<ForgotPasswordFormValues>) => (
          <Form onSubmit={props.handleSubmit}>
            <Paper withBorder shadow="md" p={30} mt="xl">
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

              <Button
                type="submit"
                size="md"
                fullWidth
                mt="md"
                disabled={props.isValid === false}
              >
                Reset password
              </Button>

              <Center mt="md">
                <Anchor component={Link} to="/signin" color="dimmed" size="md">
                  <Center inline>
                    <ArrowLeft size={12} />
                    <Box ml={5}>Back to login page</Box>
                  </Center>
                </Anchor>
              </Center>
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ForgotPassword;
