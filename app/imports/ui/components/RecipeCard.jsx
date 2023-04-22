/* Component for layout out a Profile Card. */
import { Badge, Card, Col } from 'react-bootstrap';
import { HeartFill, Heart } from 'react-bootstrap-icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { useTracker } from 'meteor/react-meteor-data';
import { Profiles } from '../../api/profiles/Profiles';
import LoadingSpinner from './LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';

const RecipeCard = ({ recipe, favorite }) => {
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
  console.log(recipe.favoriteBy);
  return (ready ? (
    <Col>
      <Card className="h-100">
        <Card.Header>
          <Card.Img src={recipe.picture} />
          <Card.Title><Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link></Card.Title>
          <Card.Subtitle>{recipe.time}</Card.Subtitle>
          {favorite && isFavorite ? (
            <HeartFill className="text-danger" onClick={() => toggleFavorite()} />
          ) : (
            <Heart onClick={() => toggleFavorite()} />
          )}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {recipe.description}
          </Card.Text>
          <footer className="blockquote-footer">
            {userProfile.name}
          </footer>
          <h6>Tags</h6>
          <Card.Text>
            {recipe.tags.map((tag, idx) => <Badge key={`${tag}${idx}`} bg="secondary" className="mx-1">{tag}</Badge>)}
          </Card.Text>
          {recipe.owner === Meteor.user()?.username ?
            <Link to={`/edit/${recipe._id}`}>Edit</Link> :
            ''}
        </Card.Body>
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
};

RecipeCard.defaultProps = {
  favorite: false,
};

export default RecipeCard;
