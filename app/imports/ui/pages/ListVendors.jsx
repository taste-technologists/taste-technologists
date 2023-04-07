import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
// import { useTracker } from 'meteor/react-meteor-data';
// import { Stuffs } from '../../api/stuff/Stuff';
// import LoadingSpinner from '../components/LoadingSpinner';
import VendorItem from '../components/VendorItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListStuff = () => {

  const vendors = [
    { name: 'Nijiya Market', location: '1009 University Ave #101, Honolulu, HI 96826', hours: 'Sun-Sat 9AM-9PM', _id: '1' },
    { name: 'Manoa Marketplace', location: '2752 Woodlawn Dr, Honolulu, HI 96822', hours: 'Sun-Sat 6AM-11PM', _id: '2' },
  ];

  /*
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Stuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);
  */
  return (
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
  );
};
export default ListStuff;
