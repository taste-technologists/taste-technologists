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

const SingleRecipeCard = ({ recipe, avg }) => {
  const { ready, inventory } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Inventory.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();

    // Get the Profiles

    const inv = Inventory.collection.find().fetch();
    return {
      ready: rdy,
      inventory: inv,
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
    // console.log(missArr);
    // console.log(arr);
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
      <Row className="my-2 pe-2 py-2">
        {/* Will need to implement a cost function related to vendors and inventory here */}
        <Col>
          Cook Time: {recipe.time}
        </Col>
        <Col>Number of Servings: {recipe.servings} </Col>
        <Col>Estimated Cost: ${cost.toFixed(2)}*</Col>
        Avg Rating: <ReviewRating avg={Number(avg)} />
      </Row>
      <Row>
        <Col className="text-center"><Image fluid src={recipe.picture} width={400} /></Col>
      </Row>
      <Row>
        <h2>Ingredients</h2>
        <ul>
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
        <ol>
          {recipe.instructions.map((ins, idx) => <li key={`${recipe._id}${idx}`}>{ins.step}</li>)}
        </ol>
      </Row>
      <Row><p>* Please note that the actual cost of the ingredients may be different than the estimated cost.</p></Row>
      <Row className="text-end"> {recipe.owner === Meteor.user()?.username ?
        <Link to={`/edit/${recipe._id}`}>Edit Recipe</Link> :
        ''}
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
