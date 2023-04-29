import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Pagination, Row } from 'react-bootstrap';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import RecipeCard from '../components/RecipeCard';
import { pageStyle } from './pageStyles';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const FavoritesPage = () => {

  const [activePage, setActivePage] = useState(1);

  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, recipes } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipes.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profiles
    const recipeItem = Recipes.collection.find({}).fetch();
    return {
      recipes: recipeItem,
      ready: rdy,
    };
  }, []);
  const myRec = _.filter(recipes, (recipe) => recipe.favoriteBy.includes(Meteor.user()?.username));
  const haveRecipes = myRec.length > 0;

  const indexOfLastItem = activePage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = myRec.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(myRec.length / 8) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));

  return (ready ? (
    <Container style={pageStyle} id="favorites-page">
      <Row className="text-center py-4"><Col><h2>Favorites</h2></Col></Row>

      <Row xs={1} md={2} lg={4} className="g-2">
        {/* add parameter to switch heart fill to unfill based on current user */}
        {currentItems.map((recipe) => {
          if (recipe.favoriteBy.includes(Meteor.user()?.username)) {
            return <RecipeCard key={recipe._id} recipe={recipe} favorite />;
          }
          return null;
        })}
      </Row>
      <Row hidden={haveRecipes} className="text-center pt-5">
        <h2>You have no favorite recipes!</h2>
        <h3>Click the heart on any recipe to add to your favorites.</h3>
      </Row>
      <Pagination className="my-3" hidden={!haveRecipes}>{paginationItems}</Pagination>
    </Container>
  ) : <LoadingSpinner />);
};

export default FavoritesPage;
