import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import Profiles from '../components/Profiles';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListProfilesAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { profile, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('userData');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Users and Roles
    const users = Meteor.users.find({}).fetch();
    const roles = Meteor.roleAssignment.find().fetch();

    // Add the roles to each user.
    _.each(roles, function (obj) {
      const user = _.findWhere(users, { _id: obj.user._id });
      if (user) {
        user.role = obj.role._id;
      }
    });

    return {
      profile: users,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>Admin Dashboard</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roles</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {profile.map((prof) => <Profiles key={prof._id} prof={prof} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
