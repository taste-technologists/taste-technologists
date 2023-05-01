/* Component for layout out a Profile Card. */
import { Popover, OverlayTrigger, Button, Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
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
    <Row key={item._id}>
      <Col xs={3} className="pe-0">
        <b>{item.name}</b>
      </Col>
      <Col xs={4} className="pe-0">
        {item.item}
      </Col>
      <Col xs={2} className="pe-0">
        {`$${item.price.toFixed(2)}`}
      </Col>
      <Col xs={3}>
        {item.size}
      </Col>
    </Row>
  ));
  const popover = (
    <Popover id="popover-basic" style={{ minWidth: '380px', maxWidth: '80%' }}>
      <Popover.Header as="h3">Ingredient Locations</Popover.Header>
      <Popover.Body>
        {renderedArray}
        <div hidden={missArr.length === 0}>
          <b>Not yet available:</b> <br />
          <ul>
            {missArr.map((ing, idx) => <li key={idx}>{ing}<br /></li>)}
          </ul>
        </div>
        <b>Please help us by adding ingredients to the vendor inventory.</b>
      </Popover.Body>
    </Popover>
  );
  return (ready ? (
    <Container fluid>
      <Row className="flex-row justify-content-center">
        <h2 className="text-center">{recipe.name}</h2>
        <h6 className="text-center">Created by: {recipe.author}</h6>
      </Row>
      <Row className="my-2 py-2 ">
        {/* Will need to implement a cost function related to vendors and inventory here */}
        <Col xs={6} md={3}>
          Cook Time:<br /> {recipe.time}
        </Col>
        <Col xs={6} md={3}>Servings:<br /> {recipe.servings} </Col>
        <Col xs={6} md={3}>Estimated Cost:<br /> ${cost.toFixed(2)}*</Col>
        <Col xs={6} md={3}>Avg Rating:<br /> <ReviewRating avg={Number(avg)} /></Col>
      </Row>
      <Row className="flex-row justify-content-center pb-2">{recipe.description}</Row>
      <Row>
        <Col className="text-center">
          <Image fluid src={recipe.picture} width={400} onError={(e) => { e.target.onerror = null; e.target.src = '/images/FaS-SimpleBold-transparent.png'; }} />
        </Col>
      </Row>
      <Row>
        <h2>Ingredients</h2>
        <ul className="px-5">
          {recipe.ingredients.map((ing) => <li key={`${recipe._id}${ing.name}`}>{ing.quantity} {ing.unit} {ing.name}</li>)}
        </ul>
        <div className="text-end">
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button variant="secondary" style={{ maxWidth: '250px' }}>Check Inventory</Button>
          </OverlayTrigger>
        </div>
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
