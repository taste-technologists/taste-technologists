import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { _ } from 'meteor/underscore';
import { useParams } from 'react-router';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { setRoleMethod } from '../../startup/both/Methods';
import { Profiles } from '../../api/profiles/Profiles';

const userSchema = new SimpleSchema({
  email: String,
  _id: String,
  role: { type: String },
});

const bridge = new SimpleSchema2Bridge(userSchema);

/* Renders the EditProfile page for editing a single document. */
const EditProfiles = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  console.log('EditProfile', _id);
  // Checks if current user is trying to change their own role.
  const isOwner = (_id === Meteor.userId());
  // For role of the logged in user.
  let ownerRole = '';
  // For the role of the edit page's user.
  let currentRole = '';

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready, user } = useTracker(() => {
    // Get access to userData documents.
    const subscription = Meteor.subscribe(Profiles.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Finds and sets the roles for the edit page user and logged in user
    const users = Profiles.collection.find().fetch();
    const document = Profiles.collection.findOne({ userID: _id });
    return {
      user: users,
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  _.each(user, (prof) => {
    if (prof.userID === _id) {
      currentRole = prof.role;
    } else if (prof.userID === Meteor.userId()) {
      ownerRole = prof.role;
    }
  });
  // console.log('EditProfile', doc, ready);
  // On successful submit, insert the data.

  // Checks to see if admin user is trying to change superadmin user.
  const unAuth = ((currentRole === 'superadmin' || currentRole === 'admin') && ownerRole === 'admin');
  const superAdmin = (ownerRole === 'superadmin');
  // If logged in user is superadmin, show more allowed role values.
  const allowed = superAdmin ? ['admin', 'vendor', 'user'] : ['vendor', 'user'];
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
    <Container className="py-3" id="edit-profile-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Role</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card className="uniform">
              <Card.Body>
                <TextField name="email" disabled />
                <SelectField name="role" id="role" placeholder={currentRole} allowedValues={allowed} />
                <SubmitField value="Submit" id="edit-profile-form-submit" />
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
