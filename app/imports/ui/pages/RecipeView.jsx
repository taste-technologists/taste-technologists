import React from 'react';
import { Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { _ } from 'meteor/underscore';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';
import SingleRecipeCard from '../components/SingleRecipe';
import { RecReviews } from '../../api/recipes/RecipeReviews';
import ReviewMenu from '../components/ReviewMenu';
import { Profiles } from '../../api/profiles/Profiles';

/* Renders the RecipeView page for viewing a single recipe.
* Also holds the components related to adding and viewing the recipe's reviews.
* */
const RecipeView = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('RecipeView', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready, all, user } = useTracker(() => {
    // Get access to Recipe, RecipeReview, and Profile documents.
    const subscription = Meteor.subscribe(Recipes.generalPublicationName);
    const subscription2 = Meteor.subscribe(RecReviews.generalPublicationName);
    const subscription3 = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();

    let profile = null;
    // Get the Profiles
    if (rdy) {
      const profiles = Profiles.collection.find({}).fetch();
      profile = _.findWhere(profiles, { userID: Meteor.userId() }).name;
    }
    // Get the recipe that matches the _id
    const document = Recipes.collection.findOne(_id);
    const allReviews = _.pluck(RecReviews.collection.find({ recipeId: _id }).fetch(), 'review').flat();
    return {
      doc: document,
      ready: rdy,
      all: allReviews,
      user: profile,
    };
  }, [_id]);
  // console.log('RecipeView', doc, ready);
  // On successful submit, insert the data.
  const sumRatings = _.reduce(_.pluck(all, 'rating'), (memo, num) => memo + num, 0);
  const average = Number(sumRatings > 0 ? (Math.round((sumRatings / all.length) * 2) / 2).toFixed(1) : 0);
  const reviewCount = all.length === 0 ? 0 : all.length;
  // console.log(reviewCount);
  return ready ? (
    <Container id="recipe-view-page" className="py-3 uniform">
      <SingleRecipeCard key={doc._id} recipe={doc} avg={average} count={reviewCount} />
      <ReviewMenu user={user} userID={Meteor.userId()} name={doc.name} recipeId={_id} all={all} />
    </Container>
  ) : <LoadingSpinner />;
};

export default RecipeView;
