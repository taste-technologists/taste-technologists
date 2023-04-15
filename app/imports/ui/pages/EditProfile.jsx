import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { setRoleMethod } from '../../startup/both/Methods';

const userSchema = new SimpleSchema({
  username: String,
  _id: String,
  role: String,
});

const bridge = new SimpleSchema2Bridge(userSchema);

/* Renders the EditProfile page for editing a single document. */
const EditProfiles = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditProfile', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('userData');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Meteor.users.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditProfile', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { role } = data;
    // console.log(role);
    Meteor.call(setRoleMethod, { _id, role }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Profile updated successfully', 'success');
      }
    });
  };

  return ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Role</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="username" disabled />
                <SelectField name="role" allowedValues={['user', 'vendor', 'admin']} />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditProfiles;
