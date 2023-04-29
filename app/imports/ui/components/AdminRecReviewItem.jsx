import React, { useState } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { TrashFill } from 'react-bootstrap-icons';
import { Button, Card, Collapse } from 'react-bootstrap';
import { delReviewMethod } from '../../startup/both/Methods';

/** Renders a single Accordion Item in the ReviewMenu Component. See components/ReviewMenu.jsx. */
const AdminRecReviewItem = ({ name, recId, review, idx }) => {

  // Used to toggle the full comment view
  const [isOpen, setIsOpen] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);

  const removeReview = (recipeId, reviewInfo) => {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Meteor.users.remove(userId);
        Meteor.call(delReviewMethod, { recipeId, reviewInfo });
        swal('Deleted!', 'The review has been deleted.', 'success');
      } else {
        swal('The review has not been deleted');
      }
    });
  };

  return (
    <tr>
      <td>{review.user}</td>
      <td>{name}</td>
      <td>{review.rating}</td>
      <td>
        <Button
          variant="link"
          size="sm"
          onClick={toggleCollapse}
          aria-controls="review-comment"
          aria-expanded={isOpen}
        >View Full Comment:
        </Button>
        <Collapse in={isOpen}>
          <Card.Text id="review-comment">{review.comment}</Card.Text>
        </Collapse>
      </td>
      <td>{new Date(review.created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      </td>
      <td><Button type="button" id={`review-delete-${idx}`} variant="outline-danger" onClick={() => removeReview(recId, review.userID)}><TrashFill /></Button></td>
    </tr>
  );
};

// Require a document to be passed to this component.
AdminRecReviewItem.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.string,
    userID: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
    created: PropTypes.instanceOf(Date),
  }).isRequired,
  idx: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  recId: PropTypes.string.isRequired,
};

export default AdminRecReviewItem;
