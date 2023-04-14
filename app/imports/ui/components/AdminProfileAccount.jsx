import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const AdminProfileAccount = ({ adminProfiles }) => (
  <tr>
    <td>{adminProfiles.firstName}</td>
    <td>{adminProfiles.email}</td>
    <td>{adminProfiles.role}</td>
    <td>
      <Link to={`/edit/${adminProfiles._id}`}>Edit</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
AdminProfileAccount.propTypes = {
  adminProfiles: PropTypes.shape({
    firstName: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default AdminProfileAccount;
