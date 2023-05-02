import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Pagination, Dropdown, Button } from 'react-bootstrap';
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

  const indexOfLastItem = activePage * 8;
  const indexOfFirstItem = indexOfLastItem - 8;
  const currentItems = recipeList.slice(indexOfFirstItem, indexOfLastItem);
  const dropdownStyles = { fontWeight: 'bold', fontSize: '1em', fontFamily: 'Monaco', backgroundColor: '#6c757d', color: 'white' };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const [selectedTag, setSelectedTag] = useState('All');
  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
  };

  const filteredRecipes = recipes.filter(recipe => (selectedTag === 'All' ? true : recipe.tags.includes(selectedTag)));

  const setStuff = (rec) => {
    setRecipeList(rec);
    setActivePage(1);
  };

  const paginationItems = _.range(1, Math.ceil(recipeList.length / 8) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));
  return (ready ? (
    <Container style={pageStyle} id="search-page">
      <Row className="text-center py-4"><Col><h2>Search Recipes</h2></Col></Row>
      <Row className="justify-content-start">
        <span>
          <Col>
            <Dropdown id="#btn-filter" style={{ float: 'left' }} className="m-1">
              <Dropdown.Toggle variant="info">
                {selectedTag || 'Select a tag'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="div" style={dropdownStyles} unselectable>
                  Meal Types
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('All')}>All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Breakfast')}>Breakfast</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Lunch')}>Lunch</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Dinner')}>Dinner</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Snack')}>Snack</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Dessert')}>Dessert</Dropdown.Item>
                <Dropdown.Item as="div" style={dropdownStyles} unselectable>
                  Dietary Restrictions
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Vegan')}>Vegan</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Vegetarian')}>Vegetarian</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Gluten-free')}>Gluten-Free</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Dairy-free')}>Dairy-Free</Dropdown.Item>
                <Dropdown.Item onClick={() => handleTagSelect('Pescatarian')}>Pescatarian</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Button style={{ float: 'left' }} id="btn-search" variant="warning" className="m-1" onClick={() => setStuff(filteredRecipes)}>Search</Button>
          </Col>
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
