import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { TrashFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

/** Renders a single row in the List Profiles (Admin) table. See pages/ListProfilesAdmin.jsx. */
const Profiles = ({ prof }) => {
  const removeItem = (userId) => {
    // console.log(`The item removed is ${userId}`);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Meteor.users.remove(userId);
        swal('Deleted!', 'The account has been deleted.', 'success');
      } else {
        swal('The account has not been deleted');
      }
    });
  };
  // Hides removal button for all admin users.
  const disable = (prof.role === 'admin' || prof.role === 'superadmin');
  // Hides edit link for superadmin and admin.
  const unAuth = Roles.userIsInRole(Meteor.userId(), 'admin') && prof.role === 'admin';
  return (
    <tr>
      <td>{prof.username}</td>
      <td>{prof.role}</td>
      <td><Link to={`/profile-edit/${prof._id}`} hidden={prof.role === 'superadmin' || unAuth}>Edit</Link></td>
      <td className="text-center"><Button type="button" variant="danger" hidden={disable} disabled={disable} onClick={() => removeItem(prof._id)}><TrashFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
Profiles.propTypes = {
  prof: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default Profiles;
