import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { TrashFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { removeProfileMethod } from '../../startup/both/Methods';

/** Renders a single row in the List Profiles (Admin) table. See pages/ListProfilesAdmin.jsx. */
const ProfileItem = ({ prof }) => {

  const removeItem = (userId, email) => {
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
        Meteor.call(removeProfileMethod, { userId, email });
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
      <td>{prof.email}</td>
      <td>{prof.role}</td>
      <td><Link to={`/profile-edit/${prof.userID}`} hidden={prof.role === 'superadmin' || unAuth}>Edit</Link></td>
      <td className="text-center">{prof.vendor && prof.role !== 'vendor' ? '✔' : ''}</td>
      <td className="text-center"><Button type="button" variant="danger" hidden={disable} disabled={disable} onClick={() => removeItem(prof.userID, prof.email)}><TrashFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
ProfileItem.propTypes = {
  prof: PropTypes.shape({
    email: PropTypes.string,
    _id: PropTypes.string,
    userID: PropTypes.string,
    role: PropTypes.string,
    vendor: PropTypes.bool,
  }).isRequired,
};

export default ProfileItem;
