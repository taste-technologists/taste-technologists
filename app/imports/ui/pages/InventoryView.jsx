import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { Inventory } from '../../api/vendor/VendorInventory';
import LoadingSpinner from '../components/LoadingSpinner';
import IngredientAdmin from '../components/IngredientAdmin';
/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */

const InventoryView = () => {
  const [activePage, setActivePage] = useState(1);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ingredients, ready } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Inventory.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const vendorIngredients = _.sortBy(Inventory.collection.find().fetch(), 'name');
    // console.log(vendorIngredients);
    return {
      ingredients: vendorIngredients,
      ready: rdy,
    };
  }, []);

  const indexOfLastItem = activePage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = ingredients.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(ingredients.length / 10) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));

  return (ready ? (
    <Container className="py-3" id="admin-inventory-page">
      <Row className="justify-content-center">
        <Col className="text-center">
          <h2>Vendor List</h2>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Item</th>
              <th>Price ($)</th>
              <th>Size</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, idx) => <IngredientAdmin idx={idx} key={item._id} ingredient={item} />)}
          </tbody>
        </Table>
        <Pagination className="my-3">{paginationItems}</Pagination>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};
export default InventoryView;
