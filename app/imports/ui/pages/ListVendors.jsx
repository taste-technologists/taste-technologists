import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorItem from '../components/VendorItem';
import { Vendors } from '../../api/vendor/Vendors';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListVendors = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendors.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorAccount = Vendors.collection.find().fetch();
    return {
      vendors: vendorAccount,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Vendor List</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Hours</th>
                <th>Inventory</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => <VendorItem key={vendor._id} vendor={vendor} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default ListVendors;
