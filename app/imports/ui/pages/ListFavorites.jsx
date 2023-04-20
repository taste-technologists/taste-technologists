import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import RecipeCard from '../components/RecipeCard';
import { pageStyle } from './pageStyles';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const FavoritesPage = () => {
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
  const currentUser = Meteor.user()?.username;
  return (ready ? (
    <Container style={pageStyle}>
      <Row xs={1} md={2} lg={4} className="g-2">
        {/* add parameter to switch heart fill to unfill based on current user */}
        {recipes.map((recipe) => {
          if (recipe.favoriteBy.includes(currentUser)) {
            return <RecipeCard key={recipe._id} recipe={recipe} favorite="true" />;
          }
          return null;
        })}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default FavoritesPage;
