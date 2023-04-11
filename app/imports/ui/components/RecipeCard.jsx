/* Component for layout out a Profile Card. */
import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const RecipeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src={recipe.picture} width={200} />
        <Card.Title>{recipe.name}</Card.Title>
        <Card.Subtitle>{recipe.time}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {recipe.description}
        </Card.Text>
        <h6>Tags</h6>
        <Card.Text>
          {recipe.tags.map((tag, idx) => <Badge key={`${tag}${idx}`} bg="secondary" className="mx-1">{tag}</Badge>)}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
