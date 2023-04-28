import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import { Accordion, Pagination } from 'react-bootstrap';
import AddReview from './AddReview';
import RecReviewItem from './RecReviewItem';

const ReviewMenu = ({ name, recipeId, userID, all, user }) => {
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const sortedAll = all.sort((a, b) => b.created - a.created);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const indexOfLastItem = activePage * 5;
  const indexOfFirstItem = indexOfLastItem - 5;
  const currentItems = sortedAll.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const paginationItems = [];
  for (let i = 1; i <= Math.ceil(all.length / 5); i++) {
    paginationItems.push(
      <Pagination.Item key={i} active={i === activePage} onClick={() => handlePageChange(i)}>
        {i}
      </Pagination.Item>,
    );
  }
  return (
    <>
      <Button variant="outline-primary" id="review-button" onClick={handleShow} className="me-2">
        Reviews
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
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
