import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { setRoleMethod } from '../../startup/both/Methods';

const userSchema = new SimpleSchema({
  username: String,
  _id: String,
  role: { type: String },
});

const bridge = new SimpleSchema2Bridge(userSchema);

/* Renders the EditProfile page for editing a single document. */
const EditProfiles = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditProfile', _id);
  // Checks if current user is trying to change their own role.
  const isOwner = (_id === Meteor.user()._id);
  // For role of the logged in user.
  let ownerRole = '';
  // For the role of the edit page's user.
  let currentRole = '';
  // Finds and sets the roles for the edit page user and logged in user
  const roles = Meteor.roleAssignment.find().fetch();
  _.each(roles, (obj) => {
    if (obj.user._id === _id) {
      currentRole = obj.role._id;
    }
    if (obj.user._id === Meteor.user()._id) {
      ownerRole = obj.role._id;
    }
  });
  // Checks to see if admin user is trying to change superadmin user.
  const unAuth = ((currentRole === 'superadmin' || currentRole === 'admin') && ownerRole === 'admin');
  const superAdmin = (ownerRole === 'superadmin');
  // If logged in user is superadmin, show more allowed role values.
  const allowed = superAdmin ? ['admin', 'vendor', 'user'] : ['vendor', 'user'];

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to userData documents.
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
    // Calls meteor method to change role if the user isn't trying to change their own role.
    // Otherwise throws an error.
    // Redundancy: Admin user will be able to access page even if it's their own account;
    // however they won't be able to edit roles of equal or higher authority.
    if (!isOwner && !unAuth) {
      Meteor.call(setRoleMethod, { _id, role }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Profile updated successfully', 'success');
        }
      });
    } else {
      let message = 'an admin';
      if (isOwner) {
        message = 'your own';
      }
      swal('Error', `You cannot change ${message} profile!`, 'error');
    }
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
                <SelectField name="role" placeholder={currentRole} allowedValues={allowed} />
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
