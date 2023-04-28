import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Ingredient from '../components/Ingredient';
import { Inventory } from '../../api/vendor/VendorInventory';
import LoadingSpinner from '../components/LoadingSpinner';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */

const InventoryView = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ingredients, ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Inventory.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorIngredients = Inventory.collection.find().fetch();
    // console.log(vendorIngredients);
    return {
      ingredients: vendorIngredients,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3" id="admin-inventory-page">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Vendor List</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Item</th>
                <th>Price ($)</th>
                <th>Size</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((item, idx) => <Ingredient idx={idx} key={item._id} ingredient={item} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default InventoryView;
