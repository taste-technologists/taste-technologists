import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const Profiles = ({ stuff }) => (
  <tr>
    <td>{stuff.username}</td>
    <td>{stuff.role}</td>
    <td><Link to={`/profile-edit/${stuff._id}`}>Edit</Link></td>
  </tr>
);

// Require a document to be passed to this component.
Profiles.propTypes = {
  stuff: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
    role: PropTypes.string,
  }).isRequired,
};

export default Profiles;
