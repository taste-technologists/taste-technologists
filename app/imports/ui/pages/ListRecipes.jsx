import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { pageStyle } from './pageStyles';
import RecipeCard from '../components/RecipeCard';

/* Renders the Profile Collection as a set of Cards. */
const RecipesPage = () => (
  <Container style={pageStyle}>
    <Row xs={1} md={2} lg={4} className="g-2">
      <RecipeCard />
    </Row>
  </Container>
);

export default RecipesPage;
