import React from 'react';
import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  createStyles,
} from '@mantine/core';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AlertTriangle } from 'tabler-icons-react';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

const initialValues: ResetPasswordFormValues = {
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
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

const ResetPassword = () => {
  const { classes } = useStyles();

  return (
    <Container size={420} my={40}>
      <Title className={classes.title} align="center">
        Reset password
      </Title>
      <Text className={classes.text} color="dimmed" align="center" mt={5}>
        You can now change your password and start selling
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnMount={true}
        onSubmit={(values: ResetPasswordFormValues, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {(props: FormikProps<ResetPasswordFormValues>) => (
          <Form onSubmit={props.handleSubmit}>
            <Paper withBorder shadow="md" p={30} mt={30}>
              <PasswordInput
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                label="Password"
                type="password"
                placeholder="Password"
                required
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

              <PasswordInput
                size="md"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
                name="confirmPassword"
                label="Confirm password"
                type="password"
                placeholder="Confirm your password"
                required
                mt="md"
                error={
                  props.touched.confirmPassword && props.errors.confirmPassword
                }
                classNames={{
                  input:
                    props.touched.confirmPassword &&
                    props.errors.confirmPassword
                      ? classes.invalid
                      : undefined,
                }}
                rightSection={
                  props.touched.confirmPassword &&
                  props.errors.confirmPassword ? (
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
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ResetPassword;
