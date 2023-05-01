import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from './LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';
import RecipeItem from './RecipeItem';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const ListRecipes = () => {
  const [activePage, setActivePage] = useState(1);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, recipes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const recipeItems = _.sortBy(Recipes.collection.find({}).fetch(), 'name');
    return {
      recipes: recipeItems,
      ready: rdy,
    };
  }, []);

  const indexOfLastItem = activePage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(recipes.length / 10) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));
  return (ready ? (
    <Container fluid className="py-3" id="admin-recipe-page">
      <Row className="justify-content-center">
        <Col xs={10} className="text-center">
          <h2>Recipes</h2>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Owner</th>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((recipe, idx) => <RecipeItem key={recipe._id} recipe={recipe} idx={idx} />)}
          </tbody>
        </Table>
        <Pagination className="my-3 flex-wrap">{paginationItems}</Pagination>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListRecipes;
