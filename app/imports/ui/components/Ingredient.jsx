import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import { Inventory } from '../../api/vendor/VendorInventory';

const Ingredient = ({ ingredient, idx }) => {
  const notAuth = Roles.userIsInRole(Meteor.userId(), 'user');
  const removeItem = (docID) => {
    // console.log(`The item removed is ${userId}`);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Meteor.users.remove(userId);
        Inventory.collection.remove({ _id: docID });
        swal('Deleted!', 'The item has been deleted.', 'success');
      } else {
        swal('The item has not been deleted');
      }
    });
  };
  return (
    <tr>
      <td>{ingredient.item}</td>
      <td>{ingredient.price.toFixed(2)}</td>
      <td>{ingredient.size}</td>
      <td>
        <Link to={`/inventory-edit/${ingredient._id}`} id={`edit-inventory-${idx}`}>Edit</Link>
      </td>
      <td hidden={notAuth} className="text-center"><Button id={`delete-ing-${idx}`} type="button" variant="danger" onClick={() => removeItem(ingredient._id)}><TrashFill /></Button></td>
    </tr>
  );
};

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
