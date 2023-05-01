/* Component for layout out a Profile Card. */
import { Accordion, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import AccordionBody from 'react-bootstrap/AccordionBody';
import LoadingSpinner from './LoadingSpinner';
import { Inventory } from '../../api/vendor/VendorInventory';
import ReviewRating from './ReviewRating';
import { Recipes } from '../../api/recipes/Recipes';

const SingleRecipeCard = ({ recipe, avg }) => {
  const { ready, inventory, isOwner } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Inventory.userPublicationName);
    const subscription2 = Meteor.subscribe(Recipes.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready();

    // Get the Profiles
    const inv = Inventory.collection.find().fetch();
    const thisRecipe = Recipes.collection.find({ _id: recipe._id }).fetch();

    let owner;
    if (rdy) {
      owner = thisRecipe[0].owner;
    }
    const isOwned = owner === Meteor.user()?.username;
    return {
      ready: rdy,
      inventory: inv,
      isOwner: isOwned,
    };
  }, []);
  const foundArr = [];
  const missArr = [];
  let cost = 0;

  _.each(recipe.ingredients, (ing) => {
    const arr = _.filter(inventory, (item) => item.item.toLowerCase() === ing.name.toLowerCase());
    if (arr.length > 0) {
      foundArr.push(arr);
      cost += _.min(arr, (obj) => obj.price).price;
    } else {
      missArr.push(ing.name);
    }
  });
  const thisArr = foundArr.flat();
  const renderedArray = thisArr.map((item) => (
    <div key={item._id}>
      <h2>{item.name}</h2>
      <p>Item: {item.item}</p>
      <p>Price: {item.price}</p>
      <p>Size: {item.size}</p>
    </div>
  ));

  return (ready ? (
    <Container fluid>
      <Row className="flex-row justify-content-center">
        <h2 className="text-center">{recipe.name}</h2>
        <h6 className="text-center">Created by: {recipe.author}</h6>
        {recipe.description}
      </Row>
      <Row className="my-2 py-2">
        {/* Will need to implement a cost function related to vendors and inventory here */}
        <Col xs={6} md={3}>
          Cook Time:<br /> {recipe.time}
        </Col>
        <Col xs={6} md={3}>Servings:<br /> {recipe.servings} </Col>
        <Col xs={6} md={3}>Estimated Cost:<br /> ${cost.toFixed(2)}*</Col>
        <Col xs={6} md={3}>Avg Rating:<br /> <ReviewRating avg={Number(avg)} /></Col>
      </Row>
      <Row>
        <Col className="text-center"><Image fluid src={recipe.picture} width={400} /></Col>
      </Row>
      <Row>
        <h2>Ingredients</h2>
        <ul className="px-5">
          {recipe.ingredients.map((ing) => <li key={`${recipe._id}${ing.name}`}>{ing.quantity} {ing.unit} {ing.name}</li>)}
        </ul>
        <Accordion>
          <Accordion.Header>Nearby stores with ingredients</Accordion.Header>
          <AccordionBody>
            {renderedArray}
            <h2>The following are not yet available at any vendor</h2>
            {missArr.map((ing) => <p>{ing}</p>)}
          </AccordionBody>
        </Accordion>
      </Row>
      <Row>
        <h2>Instructions:</h2>
        <ol className="px-5">
          {recipe.instructions.map((ins, idx) => <li key={`${recipe._id}${idx}`}>{ins.step}</li>)}
        </ol>
      </Row>
      <Row><p>* Please note that the actual cost of the ingredients may be different than the estimated cost.</p></Row>
      <Row className="text-end">
        <Link to={`/edit/${recipe._id}`} hidden={!isOwner}>Edit Recipe</Link>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

SingleRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      unit: PropTypes.string,
    })),
    servings: PropTypes.number,
    instructions: PropTypes.arrayOf(PropTypes.shape({
      step: PropTypes.string,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
  avg: PropTypes.number.isRequired,
};

export default SingleRecipeCard;
