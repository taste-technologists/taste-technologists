/* Component for layout out a Profile Card. */
import { Badge, Card, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';

const RecipeCard = () => (
  <Col>
    <Card className="h-100">
      <Card.Header>
        <Image src="https://www.allrecipes.com/thmb/XQMSfxRQojpv7WGMHruq-F0IMng=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Feta-Spinach-Puff-Pastry-Bites-fabeveryday-9aa534d8ba2a48f5aa36570dcc2c63b5.jpg" width={200} />
        <Card.Title>Feta-Spinach Puff Pastry Bites</Card.Title>
        <Card.Subtitle>35 minutes</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          This easy appetizer recipe is great for entertaining. The feta cheese adds a light bite to the rich, creamy spinach and cheese-filled cups that will make them unforgettable.
        </Card.Text>
        <h6>Tags</h6>
        <Card.Text>
          <Badge bg="secondary">Snack</Badge>
          <Badge bg="secondary">Cheese</Badge>
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
  }).isRequired,
};

export default RecipeCard;
