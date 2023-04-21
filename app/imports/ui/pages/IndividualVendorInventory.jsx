import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Inventory } from '../../api/vendor/VendorInventory';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendor } from '../../api/vendor/Vendors';
import Ingredient from '../components/Ingredient';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */

const IndividualInventoryView = () => {
  const vendorID = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ingredients, ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Inventory.userPublicationName);
    const subscription2 = Meteor.subscribe(Vendor.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();
    // vendor = Vendor.collection.findOne(vendorID); is only returning Nijiya?
    // eslint-disable-next-line no-param-reassign
    const vendor = Vendor.collection.findOne(vendorID);
    console.log(vendor);
    console.log(vendorID);
    const allIngredients = Inventory.collection.find().fetch();
    const vendorIngredients = allIngredients.filter(ingredient => ingredient.name.includes(vendor.name));
    return {
      ingredients: vendorIngredients,
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
                <th>Vendor</th>
                <th>Item</th>
                <th>Price ($)</th>
                <th>Size</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => <Ingredient key={ingredient._id} ingredient={ingredient} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default IndividualInventoryView;
