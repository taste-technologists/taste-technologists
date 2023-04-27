import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const titleCase = (str) => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
const Ingredient = ({ ingredient, idx }) => (

  <tr>
    <td>{ingredient.name}</td>
    <td>{titleCase(ingredient.item)}</td>
    <td>{ingredient.price.toFixed(2)}</td>
    <td>{ingredient.size}</td>
    <td>
      <Link to={`/inventory-edit/${ingredient._id}`} id={`edit-inventory-${idx}`}>Edit</Link>
    </td>
  </tr>

);

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    item: PropTypes.string,
    price: PropTypes.number,
    size: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default Ingredient;
