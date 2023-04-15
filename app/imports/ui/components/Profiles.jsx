import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Profiles (Admin) table. See pages/ListProfilesAdmin.jsx. */
const Profiles = ({ prof }) => (
  <tr>
    <td>{prof.username}</td>
    <td>{prof.role}</td>
    <td><Link to={`/profile-edit/${prof._id}`}>Edit</Link></td>
  </tr>
);

// Require a document to be passed to this component.
Profiles.propTypes = {
  prof: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default Profiles;
