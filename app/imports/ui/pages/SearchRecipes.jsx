import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import RecipeCard from '../components/RecipeCard';
import { pageStyle } from './pageStyles';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Recipe documents. Use <RecipeCard> to render each recipe card. */
const SearchRecipesPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [recipeList, setRecipeList] = useState([]);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, recipes } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipes.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Profiles
    const recipeItem = Recipes.collection.find({}).fetch();
    if (rdy) {
      setRecipeList(recipeItem);
    }
    return {
      recipes: recipeItem,
      ready: rdy,
    };
  }, []);
  const breakfastRecipes = recipes.filter(recipe => recipe.tags.includes('Breakfast'));
  const lunchRecipes = recipes.filter(recipe => recipe.tags.includes('Lunch'));
  const dinnerRecipes = recipes.filter(recipe => recipe.tags.includes('Dinner'));
  const snackRecipes = recipes.filter(recipe => recipe.tags.includes('Snack'));


  // console.log(recipeList);

  const indexOfLastItem = activePage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = recipeList.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(recipeList.length / 8) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));

  const setStuff = (rec) => {
    setRecipeList(rec);
    setActivePage(1);
  };

  return (ready ? (
    <Container style={pageStyle} id="search-page">
      <Row className="text-center py-4"><Col><h2>Search Recipes</h2></Col></Row>
      <Row>
        <span>
          <Col style={{ float: 'left' }} className="pe-1"> <Button id="btn-all" active onClick={() => setStuff(recipes)}> All </Button> </Col>
          <Col style={{ float: 'left' }} className="pe-1"> <Button id="btn-breakfast" active onClick={() => setStuff(breakfastRecipes)}> All </Button> </Col>
          <Col style={{ float: 'left' }} className="pe-1"> <Button id="btn-lunch" onClick={() => setStuff(lunchRecipes)}> Breakfast </Button> </Col>
          <Col style={{ float: 'left' }} className="pe-1"> <Button id="btn-dinner" onClick={() => setStuff(dinnerRecipes)}>Lunch</Button> </Col>
          <Col style={{ float: 'left' }} className="pe-1"> <Button id="btn-snack" onClick={() => setStuff(snackRecipes)}> Dinner</Button> </Col>
        </span>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-2 pt-2">
        {currentItems.map((recipe, idx) => <RecipeCard key={recipe._id} idx={idx} recipe={recipe} />)}
      </Row>
      <Pagination className="my-3 flex-wrap">{paginationItems}</Pagination>
    </Container>
  ) : <LoadingSpinner />);
};

export default SearchRecipesPage;
