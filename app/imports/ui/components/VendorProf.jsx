import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Vendor table. See pages/ListVendors.jsx. */
const VendorProf = ({ vendor }) => {
  // To check if user is admin and if there are no owners in the vendor array of this store.
  const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin']);
  const noOwner = Array.isArray(vendor.vendor);
  // To check if the currently logged in user is a vendor and is a vendor for the store.
  const isVendorOwner = Roles.userIsInRole(Meteor.userId(), ['vendor']) && noOwner;
  // To check if the user is authorized to edit the vendor profile.
  const isAuth = isAdmin || isVendorOwner;
  return (
    <tr>
      <td>{vendor.name}<br /> <Link to={`/edit-vendor/${vendor._id}`} hidden={!isAuth}>Edit</Link></td>
      <td>{vendor.location}</td>
      <td>{vendor.hours}</td>
      <td>
        <Link to={`/inventory/${vendor._id}`}>Inventory</Link>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
VendorProf.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    vendor: {
      type: Array,
      optional: true,
    },
    _id: PropTypes.string,
  }).isRequired,
};

export default VendorProf;
