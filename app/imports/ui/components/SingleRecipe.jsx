/* Component for layout out a Profile Card. */
import { Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from './LoadingSpinner';

const SingleRecipeCard = ({ recipe }) => {
  const { ready, userProfile } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Profiles.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    let profile = null;
    // Get the Profiles
    if (rdy) {
      const profiles = Profiles.collection.find({}).fetch();
      const owner = recipe.owner;
      profile = _.findWhere(profiles, { email: owner });
    }
    return {
      ready: rdy,
      userProfile: profile,
    };
  }, []);
  return (ready ? (
    <Container>
      <Row className="flex-row justify-content-center">
        <h2 className="text-center">{recipe.name}</h2>
        <h6 className="text-center">Created by: {userProfile.name}</h6>
        {recipe.description}
      </Row>
      <Row className="my-2 pe-2">
        {/* Will need to implement a cost function related to vendors and inventory here */}
        || Cook Time: {recipe.time} || Number of Servings: {recipe.servings} || Estimated Cost: $20 ||
      </Row>
      <Row>
        <Col className="text-center"><Image src={recipe.picture} width={400} /></Col>
      </Row>
      <Row>
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients.map((ing) => <li key={`${recipe._id}${ing.name}`}>{ing.quantity} {ing.unit} {ing.name}</li>)}
        </ul>
      </Row>
      <Row>
        <h2>Instructions:</h2>
        <ol>
          {recipe.instructions.map((ins, idx) => <li key={`${recipe._id}${idx}`}>{ins.step}</li>)}
        </ol>
      </Row>
      <Row> {recipe.owner === Meteor.user()?.username ?
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
    time: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      unit: PropTypes.string })),
    servings: PropTypes.number,
    instructions: PropTypes.arrayOf(PropTypes.shape({
      step: PropTypes.string,
    })),
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default SingleRecipeCard;
