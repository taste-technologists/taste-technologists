import React from 'react';
import { Star, StarFill, StarHalf } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';

/* Renders the RecipeRating component for recipes. */
const ReviewRating = ({ avg, count }) => {

  const numFullStars = Math.floor(avg);
  // Check if the rating has a half-star
  const hasHalfStar = avg % 1 !== 0;
  // Compute the number of empty stars
  const numEmptyStars = 5 - numFullStars - hasHalfStar;
  // Creates an Array of full stars.
  const fullStars = Array.from({ length: numFullStars }, (_, i) => <StarFill key={i} className="text-warning" />);

  // Create a half-filled star component if the rating has a half-star
  const halfStar = hasHalfStar ? <StarHalf key={numFullStars} className="text-warning" /> : null;

  // Create an array of empty stars
  const emptyStars = Array.from({ length: numEmptyStars }, (_, i) => <Star key={numFullStars + 1 + i} className="text-warning" />);

  const stars = avg === 0 ? 'No Ratings' : [...fullStars, halfStar, ...emptyStars];
  // Concatenate the three arrays and return
  return <div className="d-inline py-2" style={{ color: 'darkgray' }}>{stars} ({count})</div>;
};

ReviewRating.propTypes = {
  avg: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};

export default ReviewRating;
