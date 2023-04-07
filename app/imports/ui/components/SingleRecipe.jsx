/* Component for layout out a Profile Card. */
import { Col, Container, Image, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const SingleRecipeCard = ({ recipe }) => (
  <Container>
    <Row className="flex-row justify-content-center">
      <h2 className="text-center">{recipe.name}</h2>
      {recipe.description}
    </Row>
    <Row className="my-2 pe-2">
      || Cook Time: {recipe.time} || Number of Servings: {recipe.servings} || Estimated Cost: $20 ||
    </Row>
    <Row>
      <Col className="text-center"><Image src={recipe.picture} width={400} /></Col>
    </Row>
    <Row>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ing) => <li>{ing}</li>)}
      </ul>
    </Row>
    <Row>
      <h2>Instructions:</h2>
      <ol>
        {recipe.instructions.map((ing) => <li>{ing}</li>)}
      </ol>

    </Row>
  </Container>
);

SingleRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    ingredients: PropTypes.string,
    servings: PropTypes.number,
    instructions: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default SingleRecipeCard;
