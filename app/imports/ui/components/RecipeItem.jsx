import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { removeRecipeMethod } from '../../startup/both/Methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const RecipeItem = ({ recipe, idx }) => {
  const removeRecipe = () => {
    const _id = recipe._id;
    swal({
      title: 'Are you sure you want to delete this recipe?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // console.log(`Remove ${_id}`);
        Meteor.call(removeRecipeMethod, { _id });
        swal('Deleted!', 'The recipe has been deleted.', 'success');
      } else {
        swal('The recipe has not been deleted');
      }
    });
  };
  return (
    <tr>
      <td>{recipe.name}</td>
      <td>{recipe.description}</td>
      <td>
        <Link to={`/admin-edit/${recipe._id}`}>Edit</Link>
      </td>
      <td className="text-center"><Button id={`delete-recipe-${idx}`} type="button" variant="danger" onClick={() => removeRecipe()}><TrashFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
RecipeItem.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.number,
    _id: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default RecipeItem;
