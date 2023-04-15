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
  const { stuffs, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('userData');
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Meteor.users.find({}).fetch();
    const roles = Meteor.roleAssignment.find().fetch();

    const result = _.each(roles, function (obj) {
      const user = _.findWhere(items, { _id: obj.user._id });
      if (user) {
        user.role = obj.role._id;
      }
    });

    console.log(result);

    return {
      stuffs: items,
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
                <th>roles</th>
                <th>edit</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => <Profiles key={stuff._id} stuff={stuff} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfilesAdmin;
