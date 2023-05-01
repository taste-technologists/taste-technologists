import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Accordion, Pagination } from 'react-bootstrap';
import AddReview from './AddReview';
import RecReviewItem from './RecReviewItem';

/** This component is displayed in the RecipeView page for each recipe.
 * The AddReview form and RecReviewItems components are displayed in the
 * React Offcanvas component.
 * */

const ReviewMenu = ({ name, recipeId, userID, all, user }) => {
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(1);

  // Sort Reviews by newest.
  const sortedAll = all.sort((a, b) => b.created - a.created);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handles the number of reviews visible per page.
  const indexOfLastItem = activePage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = sortedAll.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = _.range(1, Math.ceil(all.length / 5) + 1).map((i) => (
    <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
      {i}
    </Pagination.Item>
  ));
  return (
    <>
      <Button variant="secondary" id="review-button" onClick={handleShow} className="me-2">
        Reviews
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="bg-img">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Reviews</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <AddReview name={name} recipeId={recipeId} userID={userID} user={user} />
          <h3>Reviews: </h3>
          <Accordion>
            {currentItems.map((rev, idx) => (
              <RecReviewItem key={idx} idx={idx} review={rev} />
            ))}
          </Accordion>
          <Pagination className="my-3">{paginationItems}</Pagination>
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
