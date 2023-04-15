/* Component for layout out a Profile Card. */
import { Badge, Card, Col } from 'react-bootstrap';
import { HeartFill } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Card.Img src={recipe.picture} />
        <Card.Title><Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link></Card.Title>
        <Card.Subtitle>{recipe.time}</Card.Subtitle>
        <HeartFill />
      </Card.Header>
      <Card.Body>
        <Card.Text>
          {recipe.description}
        </Card.Text>
        <h6>Tags</h6>
        <Card.Text>
          {recipe.tags.map((tag, idx) => <Badge key={`${tag}${idx}`} bg="secondary" className="mx-1">{tag}</Badge>)}
        </Card.Text>
        <Link to={`/edit/${recipe._id}`}>Edit</Link>
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
