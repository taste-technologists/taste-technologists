import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const VendorItem = ({ vendor }) => (
  <tr>
    <td>{vendor.name}</td>
    <td>{vendor.location}</td>
    <td>{vendor.hours}</td>
    <td>
      <Link to={`/inventory/${vendor._id}`}>Inventory</Link>
    </td>
  </tr>
);

// Require a document to be passed to this component.
VendorItem.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default VendorItem;
