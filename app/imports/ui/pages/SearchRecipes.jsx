import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import RecipeCard from '../components/RecipeCard';
import { pageStyle } from './pageStyles';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const SearchRecipesPage = () => {
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
  const lunchRecipes = recipes.filter(recipe => recipe.tags.includes('Lunch'));
  const dinnerRecipes = recipes.filter(recipe => recipe.tags.includes('Dinner'));
  const snackRecipes = recipes.filter(recipe => recipe.tags.includes('Snack'));
  const [recipeList, setRecipeList] = useState(recipes);
  console.log(recipeList);
  return (ready ? (
    <Container style={pageStyle} id="search-page">
      <Row>
        <span>
          <Col style={{ float: 'left' }}> <Button id="btn-all" active onClick={() => setRecipeList(recipes)}> All </Button> </Col>
          <Col style={{ float: 'left' }}> <Button id="btn-lunch" onClick={() => setRecipeList(lunchRecipes)}> Lunch </Button> </Col>
          <Col style={{ float: 'left' }}> <Button id="btn-dinner" onClick={() => setRecipeList(dinnerRecipes)}>Dinner</Button> </Col>
          <Col style={{ float: 'left' }}> <Button id="btn-snack" onClick={() => setRecipeList(snackRecipes)}> Snack</Button> </Col>
        </span>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2">
        {recipeList.map((recipe) => {
          if (recipe.favoriteBy.includes(Meteor.user()?.username)) {
            return <RecipeCard key={recipe._id} recipe={recipe} favorite="true" />;
          }
          return <RecipeCard key={recipe._id} recipe={recipe} favorite="false" />;

        })}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default SearchRecipesPage;
