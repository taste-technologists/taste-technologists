import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Ingredient = ({ ingredient }) => (
  <tr>
    <td>{ingredient.vendor}</td>
    <td>{ingredient.item}</td>
    <td>{ingredient.price}</td>
    <td>{ingredient.size}</td>
    <td>
      <Link to={`/edit-ingredient/${ingredient._id}`}>Edit</Link>
    </td>
  </tr>

);

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    vendor: PropTypes.string,
    item: PropTypes.string,
    price: PropTypes.number,
    size: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Ingredient;
