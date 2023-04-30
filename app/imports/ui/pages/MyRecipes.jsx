import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import RecipeCard from '../components/RecipeCard';
import { pageStyle } from './pageStyles';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const MyRecipesPage = () => {
  const showEdit = true;
  const [activePage, setActivePage] = useState(1);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, recipes } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Recipes for the logged in user.

    const recipeItem = Recipes.collection.find().fetch();

    return {
      recipes: recipeItem,
      ready: rdy,
    };
  }, []);

  // Get the size of the user's recipe array.
  // If user has no recipes, the page will display this and
  // prompt user to add their own recipe.

  const indexOfLastItem = activePage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = recipes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(recipes.length / 8) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));

  const haveRecipes = recipes.length > 0;
  return (ready ? (
    <Container style={pageStyle} id="my-recipe-page">
      <Row className="text-center py-4"><Col><h2>My Recipes</h2></Col></Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {currentItems.map((recipe, idx) => <RecipeCard idx={idx} showEdit={showEdit} key={recipe._id} recipe={recipe} favorite={recipe.favoriteBy.includes(Meteor.user()?.username)} />)}
      </Row>
      <Row id="hidden-row" hidden={haveRecipes} className="text-center pt-5">
        <h2>You have no recipes!</h2>
        <h3><a href="../add">Click here to add a recipe.</a></h3>
      </Row>
      <Pagination className="my-3" hidden={!haveRecipes}>{paginationItems}</Pagination>
    </Container>
  ) : <LoadingSpinner />);
};

export default MyRecipesPage;
