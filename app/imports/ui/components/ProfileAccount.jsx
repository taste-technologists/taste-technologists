import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const ProfileAccount = ({ profiles }) => (
  <tr>
    <td>{profiles.firstName}</td>
    <td>{profiles.email}</td>
    <td>{profiles.role}</td>
    <td>
      <Link className={COMPONENT_IDS.PROFILE_EDIT} to={`/edit/${profiles._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
ProfileAccount.propTypes = {
  profiles: PropTypes.shape({
    firstName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ProfileAccount;
