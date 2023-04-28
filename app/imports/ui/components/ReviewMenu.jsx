import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import AddReview from './AddReview';
import RecReviewItem from './RecReviewItem';

const ReviewMenu = ({ name, recipeId, userID, all, user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" id="review-button" onClick={handleShow} className="me-2">
        Reviews
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Reviews</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddReview name={name} recipeId={recipeId} userID={userID} user={user} />
          <Accordion>
            {all.map((rev, idx) => <RecReviewItem key={idx} idx={idx} review={rev} />)}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

ReviewMenu.propTypes = {
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  all: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string,
    created: PropTypes.instanceOf(Date),
  })).isRequired,
  user: PropTypes.string.isRequired,
};

export default ReviewMenu;
