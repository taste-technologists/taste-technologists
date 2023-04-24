import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, RadioField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { addProfileMethod } from '../../startup/both/Methods';

/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
    name: String,
    vendor: {
      type: String,
      allowedValues: ['Yes', 'No'],
      defaultValue: 'No',
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    Meteor.call(addProfileMethod, { doc }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        Meteor.loginWithPassword(doc.email, doc.password, (errs) => {
          if (errs) {
            setError(errs.reason);
          } else {
            setRedirectToRef(true);
            setError('');
          }
        });
      }
    });
  };

  /* Display the signup form. Redirect to landing page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id="signup-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Register your account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id="signup-name" name="name" placeholder="Name you'd like displayed to others" />
                <div id="signup-vendor">
                  <RadioField id="signup-vendor" name="vendor" label="I would like a vendor role" inline />
                </div>
                <TextField id="signup-email" name="email" placeholder="E-mail address" />
                <TextField id="signup-password" name="password" placeholder="Password" type="password" />
                <ErrorsField />
                <SubmitField id="signup-submit" />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="light">
            Already have an account? Login
            {' '}
            <Link to="/signin">here</Link>
          </Alert>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
