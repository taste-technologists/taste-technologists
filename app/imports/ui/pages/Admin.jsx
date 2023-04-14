import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import ProfileAccount from '../components/ProfileAccount';
import AdminProfileAccount from '../components/AdminProfileAccount';

const Admin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, userAccount, adminAccount } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = UserProfiles.subscribeAccountsAdmin();
    const subscription2 = AdminProfiles.subscribeAccountsAdmin();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // Get the Stuff documents
    const profiles = UserProfiles.find({}, { sort: { name: 1 } }).fetch();
    const adminProfiles = AdminProfiles.find({}, { sort: { name: 1 } }).fetch();
    return {
      adminAccount: adminProfiles,
      userAccount: profiles,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id={PAGE_IDS.ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center"><h2>List Users (Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Admin;
