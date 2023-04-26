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
import { Recipes } from '../../api/recipes/Recipes';
import { removeRecipeMethod } from '../../startup/both/Methods';

const RecipeCard = ({ recipe, favorite, showEdit }) => {

  const { ready, userProfile } = useTracker(() => {

    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Profiles.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    let profile = null;
    // Get the Profiles
    if (rdy) {
      const profiles = Profiles.collection.find({}).fetch();
      const owner = recipe.owner;
      profile = _.findWhere(profiles, { email: owner });
    }
    return {
      ready: rdy,
      userProfile: profile,
    };
  }, []);
  const recipeItem = Recipes.collection;
  const [isFavorite, setIsFavorite] = useState(recipe.favoriteBy.includes(Meteor.user()?.username));

  const toggleFavorite = () => {
    const isAlreadyFavorite = recipe.favoriteBy.includes(Meteor.user()?.username);

    if (isAlreadyFavorite) {
      setIsFavorite(false);

      recipeItem.update(`${recipe._id}`, {
        $pull: { favoriteBy: Meteor.user()?.username },
      });

    } else {
      setIsFavorite(true);

      recipeItem.update(`${recipe._id}`, {
        $addToSet: { favoriteBy: Meteor.user()?.username },
      });

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
        <Card.Header className="card-header d-flex flex-column justify-content-center">
          <Card.Img src={recipe.picture} className="card-img" />
          <Card.Title className="my-2 fs-5 card-title"><Link className="recipe-view-title" to={`/recipes/${recipe._id}`}>{recipe.name}</Link></Card.Title>
          <Card.Subtitle className="">{recipe.time}</Card.Subtitle>
          {favorite && isFavorite ? (
            <HeartFill className="text-danger" onClick={() => toggleFavorite()} />
          ) : (
            <Heart onClick={() => toggleFavorite()} />
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text className="mt-2">{recipe.description}</Card.Text>
          <footer className="blockquote-footer">
            {userProfile.name}
          </footer>
          <h6>Tags</h6>
          <Card.Text>
            {recipe.tags.map((tag, idx) => <Badge key={`${tag}${idx}`} bg="secondary" className="mx-1">{tag}</Badge>)}
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
  favorite: PropTypes.bool,
  showEdit: PropTypes.bool,
};

RecipeCard.defaultProps = {
  favorite: false,
  showEdit: false,
};

export default RecipeCard;
