import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import { BasketFill, PersonFill, FileTextFill } from 'react-bootstrap-icons';
import { _ } from 'meteor/underscore';
import LoadingSpinner from '../components/LoadingSpinner';
import Profiles from '../components/Profiles';
import { Recipes } from '../../api/recipes/Recipes';
import { Inventory } from '../../api/vendor/VendorInventory';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListProfilesAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { profile, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('userData');
    const subscription2 = Meteor.subscribe(Recipes.generalPublicationName);
    const subscription3 = Meteor.subscribe(Inventory.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
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
          <Row className="justify-content-center">
            <Col className="text-center">
              <Card
                bg="primary"
                key="primary"
                text="white"
                className="mb-2"
              >
                <Card.Title>Users</Card.Title>
                <Card.Text><PersonFill className="mx-1 mb-1" />{Meteor.users.find().count()}</Card.Text>
              </Card>
            </Col>
            <Col className="text-center">
              <Card
                bg="warning"
                key="warning"
                text="white"
                className="mb-2"
              >
                <Card.Title>Recipes</Card.Title>
                <Card.Text><FileTextFill className="mx-1 mb-1" />{Recipes.collection.find().count() }</Card.Text>
              </Card>
            </Col>
            <Col className="text-center">
              <Card
                bg="success"
                key="success"
                text="white"
                className="mb-2"
              >
                <Card.Title>Ingredients</Card.Title>
                <Card.Text><BasketFill className="mx-1 mb-1" />{Inventory.collection.find().count()}</Card.Text>
              </Card>
            </Col>
          </Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
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
