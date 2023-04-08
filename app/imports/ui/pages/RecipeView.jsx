import React from 'react';
import { Container } from 'react-bootstrap';
import SingleRecipe from '../components/SingleRecipe';

/* Renders the ViewRecipe page for editing a single document. */
const RecipeView = () => {

  const recipe = {
    owner: 'admin@foo.com',
    name: 'Parmesan Thyme Crisps',
    description: 'Super simple but can be spiced up if you like with cayenne or other spices. Store in an airtight container, layered between waxed paper.',
    time: '30 minutes',
    picture: 'https://www.allrecipes.com/thmb/XLpy3coYLg-RZqlKoQFgt4M7woE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3540204-b5bad438711a4afb84c98f230bc4e712.jpg',
    tags: [
      'Snack',
    ],
    ingredients: ['8 ounces freshly grated Parmesan cheese', '4 teaspoons fresh thyme leaves'],
    instructions: ['Preheat oven to 300 degrees F (150 degrees C). Line 2 baking sheets with parchment paper. ',
      'Combine Parmesan cheese and thyme leaves in a bowl. Drop heaping teaspoonfuls of the mixture onto the lined baking sheets, spacing them 2 inches apart. Lightly press with your fingers to flatten them into circles 2 inches in diameter. ',
      'Bake in the preheated oven until slightly browned and crisp, 8 to 10 minutes. Cool slightly on the baking' +
      ' sheets, about 2 minutes. Loosen edges with a spatula and lift off the parchment paper. Transfer to wire racks and let cool completely until firm, about 10 minutes.  ',
    ],
    _id: 'abcde',
    servings: 15,
  };
  /*
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('ViewRecipe', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Recipes.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Recipes.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]); */
  // console.log('ViewRecipe', doc, ready);
  // On successful submit, insert the data.
  return (
    <Container className="py-4">
      <SingleRecipe key={recipe._id} recipe={recipe} />
    </Container>
  );
};

export default RecipeView;
