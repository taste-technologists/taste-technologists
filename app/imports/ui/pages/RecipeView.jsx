import React from 'react';
import { Container } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Recipes } from '../../api/recipes/Recipes';
import LoadingSpinner from '../components/LoadingSpinner';
import SingleRecipeCard from '../components/SingleRecipe';

/* Renders the RecipeView page for viewing a single recipe. */
const RecipeView = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('RecipeView', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Recipe documents.
    const subscription = Meteor.subscribe(Recipes.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the recipe that matches the _id
    const document = Recipes.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('RecipeView', doc, ready);
  // On successful submit, insert the data.
  return ready ? (
    <Container id="recipe-view-page" className="py-3">
      <SingleRecipeCard key={doc._id} recipe={doc} />
    </Container>
  ) : <LoadingSpinner />;
};

export default RecipeView;
