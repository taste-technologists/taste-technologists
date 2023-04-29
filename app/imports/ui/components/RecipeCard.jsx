/* Component for layout out a Profile Card. */
import { Badge, Button, Card, Col, Row } from 'react-bootstrap';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from './LoadingSpinner';
import { addFavMethod, delFavMethod, removeRecipeMethod } from '../../startup/both/Methods';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import ReviewRating from './ReviewRating';
import { RecFaves } from '../../api/recipes/RecipeFav';

const RecipeCard = ({ recipe, showEdit, idx }) => {

  const { ready, userProfile, all, faves } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Profiles.generalPublicationName);
    const subscription2 = Meteor.subscribe(RecReviews.generalPublicationName);
    const subscription3 = Meteor.subscribe(RecFaves.generalPublicationName);

    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    let profile = null;
    const allReviews = _.pluck(RecReviews.collection.find({ recipeId: recipe._id }).fetch(), 'review').flat();
    const recFaves = _.pluck(RecFaves.collection.find({ recipeId: recipe._id }).fetch(), 'favoriteBy').flat();

    // Get the Profiles
    if (rdy) {
      const profiles = Profiles.collection.find({}).fetch();
      const owner = recipe.owner;
      profile = _.findWhere(profiles, { email: owner });
    }
    return {
      ready: rdy,
      userProfile: profile,
      all: allReviews,
      faves: recFaves,
    };
  }, []);

  const [isFavorite, setIsFavorite] = useState(faves.includes(Meteor.user().username));
  const sumRatings = _.reduce(_.pluck(all, 'rating'), (memo, num) => memo + num, 0);
  const average = sumRatings > 0 ? (Math.round((sumRatings / all.length) * 2) / 2).toFixed(1) : 0;

  const toggleFavorite = () => {
    const isAlreadyFavorite = faves.includes(Meteor.user().username);
    // console.log(isAlreadyFavorite);
    if (isAlreadyFavorite) {
      setIsFavorite(false);
      Meteor.call(delFavMethod, { recipeId: recipe._id, user: Meteor.user().username });

    } else {
      setIsFavorite(true);
      Meteor.call(addFavMethod, { recipeId: recipe._id, user: Meteor.user().username });

    }
  };

  const removeItem = () => {
    const _id = recipe._id;
    swal({
      title: 'Are you sure you want to delete this recipe?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // console.log(`Remove ${_id}`);
        Meteor.call(removeRecipeMethod, { _id });
        swal('Deleted!', 'The recipe has been deleted.', 'success');
      } else {
        swal('The recipe has not been deleted');
      }
    });
  };
  // console.log(recipe.favoriteBy);
  return (ready ? (
    <Col>
      <Card className="h-100">
        <Card.Header className="rec-card-header d-flex flex-column justify-content-center px-3 pt-3">
          <Card.Img src={recipe.picture} className="rec-card-img" />
          <Card.Title className="my-2 fs-5 rec-card-title"><Link className="recipe-view-title" id={`rec-link-${idx}`} to={`/recipes/${recipe._id}`}>{recipe.name}</Link></Card.Title>
          <Card.Subtitle className="">{recipe.time}</Card.Subtitle>
          {isFavorite ? (
            <HeartFill className="text-danger" onClick={() => toggleFavorite()} />
          ) : (
            <Heart onClick={() => toggleFavorite()} />
          )}
          <Row className="mt-auto"><ReviewRating avg={Number(average)} /></Row>
        </Card.Header>
        <Card.Body>
          <Card.Text className="mt-2">{recipe.description}</Card.Text>
          <footer className="blockquote-footer">
            {userProfile.name}
          </footer>
          <h6>Tags</h6>
          <Card.Text>
            {recipe.tags.map((tag, index) => <Badge key={`${tag}${index}`} bg="secondary" className="mx-1">{tag}</Badge>)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-end" hidden={!showEdit}>
          <Row>
            <Col className="text-start"><Link className="edit" to={`/edit/${recipe._id}`}>Edit</Link></Col>
            <Col className="text-end"><Button type="button" size="sm" variant="danger" onClick={() => removeItem()}>Delete</Button></Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  ) : <LoadingSpinner />);
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    picture: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    _id: PropTypes.string,
    owner: PropTypes.string,
    favoriteBy: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      quantity: PropTypes.number,
      unit: PropTypes.string })),
    instructions: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string })),
    servings: PropTypes.number,
  }).isRequired,
  showEdit: PropTypes.bool,
  idx: PropTypes.number,
};

RecipeCard.defaultProps = {
  showEdit: false,
  idx: 1,
};

export default RecipeCard;
