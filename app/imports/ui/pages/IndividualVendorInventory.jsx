import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { CartPlusFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { Inventory } from '../../api/vendor/VendorInventory';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendor } from '../../api/vendor/Vendors';
import Ingredient from '../components/Ingredient';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */

const IndividualInventoryView = () => {
  const vendorID = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ingredients, ready, vendorInfo } = useTracker(() => {
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
    const allIngredients = Inventory.collection.find().fetch();
    let vendorIngredients;
    let sortedIng;
    if (rdy) {
      vendorIngredients = allIngredients.filter(ingredient => ingredient.name.includes(vendor.name));
      sortedIng = vendorIngredients.sort((a, b) => {
        if (a.item < b.item) {
          return -1;
        } if (a.item > b.item) {
          return 1;
        }
        return 0;
      });
    }

    return {
      vendorInfo: vendor,
      ingredients: sortedIng,
      ready: rdy,
    };
  }, []);

  const handleLinkClick = (event) => {
    event.preventDefault();
    swal({
      title: 'This will open Google Maps in a new window',
      icon: 'warning',
      buttons: {
        cancel: 'No',
        confirm: 'Yes',
      },
    }).then((value) => {
      if (value) {
        window.open(`https://www.google.com/maps/search/?api=1&query=${vendorInfo.location}`);
      }
    });
  };
  const notAuth = Roles.userIsInRole(Meteor.userId(), 'user');
  const id = vendorID._id;
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>Vendor List <Link to={`/inventory-add/${id}`} id="inventory-add-page"><CartPlusFill className="mb-2" color="black" /></Link> </h2>
          </Col>
          <p className="text-end">Click the cart to add an item</p>
          <p><b>{vendorInfo.name}</b>: {vendorInfo.hours}<br />
            <a href={`https://www.google.com/maps/search/?api=1&query=${vendorInfo.location}`} onClick={handleLinkClick}>
              {vendorInfo.location}
            </a>
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Vendor</th>
                <th>Item</th>
                <th>Price ($)</th>
                <th>Size</th>
                <th>Edit</th>
                <th hidden={notAuth}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, idx) => <Ingredient key={ingredient._id} idx={idx} ingredient={ingredient} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default IndividualInventoryView;
