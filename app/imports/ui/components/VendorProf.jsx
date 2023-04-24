import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { Link } from 'react-router-dom';
import { TrashFill } from 'react-bootstrap-icons';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { Vendor } from '../../api/vendor/Vendors';

/** Renders a single row in the List Vendor table. See pages/ListVendors.jsx. */
const VendorProf = ({ vendor, idx }) => {

  const removeVendor = (vendorID) => {
    // console.log(`The item removed is ${userId}`);
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Vendor.collection.remove(vendorID);
        swal('Deleted!', 'The vendor has been deleted.', 'success');
      } else {
        swal('The vendor has not been deleted');
      }
    });
  };

  // To check if user is admin and if there are no owners in the vendor array of this store.
  const isAdmin = Roles.userIsInRole(Meteor.userId(), ['admin', 'superadmin']);
  const noOwner = Array.isArray(vendor.owner);
  // To check if the currently logged in user is a vendor and is a vendor for the store.
  const isVendorOwner = Roles.userIsInRole(Meteor.userId(), ['vendor']) && noOwner;
  // To check if the user is authorized to edit the vendor profile.
  const isAuth = isAdmin || isVendorOwner;
  return (
    <tr>
      <td>{vendor.name}<br /> <Link to={`/edit-vendor/${vendor._id}`} id={`edit-vendor-${idx}`} hidden={!isAuth}>Edit</Link></td>
      <td>{vendor.location}</td>
      <td>{vendor.hours}</td>
      <td>
        <Link to={`/inventory/${vendor._id}`} id={`vendor-inventory-${idx}`}>Inventory</Link>
      </td>
      <td hidden={!isAdmin}><Button type="button" id={`delete-vendor-${idx}`} variant="danger" onClick={() => removeVendor(vendor._id)}><TrashFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
VendorProf.propTypes = {
  vendor: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
    hours: PropTypes.string,
    owner: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
  idx: PropTypes.number.isRequired,
};

export default VendorProf;
