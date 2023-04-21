import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import LoadingSpinner from '../components/LoadingSpinner';
import VendorProf from '../components/VendorProf';
import { Vendor } from '../../api/vendor/Vendors';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListVendor = () => {

  /* const vendors = [
    { name: 'Nijiya Market', location: '1009 University Ave #101, Honolulu, HI 96826', hours: 'Sun-Sat 9AM-9PM', _id: '1' },
    { name: 'Manoa Marketplace', location: '2752 Woodlawn Dr, Honolulu, HI 96822', hours: 'Sun-Sat 6AM-11PM', _id: '2' },
  ] */

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, vendors } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendor.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorItems = Vendor.collection.find({}).fetch();
    return {
      vendors: vendorItems,
      ready: rdy,
    };
  }, []);

  const isAuth = Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin', 'vendor']);
  const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin']);

  return (ready ? (
    <Container className="py-3" id="list-vendor-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Vendor List</h2>
            <h5><a href="/add-vendor" id="add-vendor" hidden={!isAuth}>Add Vendor</a></h5>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Hours</th>
                <th>Inventory</th>
                <th hidden={!isAdmin}>Remove</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, idx) => <VendorProf idx={idx} key={vendor._id} vendor={vendor} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default ListVendor;
