import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, ListField, ListItemField, LongTextField, NestField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Plus, TrashFill } from 'react-bootstrap-icons';
import SimpleSchema from 'simpl-schema';
import LoadingSpinner from '../components/LoadingSpinner';
import { Recipes } from '../../api/recipes/Recipes';

const formSchema = new SimpleSchema({
  name: {
    type: String,
    max: 40,
  },
  picture: String,
  time: String,
  description: {
    type: String,
    max: 200,
  },
  servings: {
    type: Number,
    defaultValue: 0,
  },
  tags: {
    type: Array,
  },
  'tags.$': String,
  ingredients: {
    type: Array,
    optional: false,
  },
  'ingredients.$': Object,
  'ingredients.$.name': String,
  'ingredients.$.quantity': {
    type: Number,
    defaultValue: 0,
  },
  'ingredients.$.unit': String,
  instructions: {
    type: Array,
    optional: false,
  },
  'instructions.$': Object,
  'instructions.$.step': String,
  'instructions.$.num': {
    type: Number,
    defaultValue: 0,
  },
  owner: String,
});
const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the EditStuff page for editing a single document. */
const AdminEditRecipe = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditStuff', _id);
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
  }, [_id]);
  // console.log('EditStuff', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, picture, time, description, servings, ingredients, instructions, tags } = data;
    Recipes.collection.update(_id, { $set: { name, picture, time, description, servings, ingredients, instructions, tags } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Recipe updated successfully', 'success')));
  };

  return ready ? (
    <Container id="admin-editrecipe-page" className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Edit Recipe</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField id="edit-recipe-name" name="name" showInlineError placeholder="Recipe name" /></Col>
                  <Col><TextField id="edit-recipe-picture" name="picture" showInlineError placeholder="Recipe picture URL" /></Col>
                </Row>
                <Row>
                  <Col><TextField id="edit-recipe-time" name="time" showInlineError placeholder="Time" /></Col>
                  <Col><NumField id="edit-recipe-servings" name="servings" decimal={null} min="0" /></Col>
                </Row>
                <LongTextField id="edit-recipe-description" name="description" placeholder="Describe the recipe here" />
                <ListField name="ingredients" initialCount={1} addIcon={<Plus className="text-black" size={30} />} removeIcon={<TrashFill className="text-black" size={15} />}>
                  <ListItemField name="$">
                    <NestField>
                      <Row>
                        <Col><NumField id="edit-recipe-ingredientsQuantity" name="quantity" min="0" /></Col>
                        <Col><SelectField id="edit-recipe-ingredientsUnit" name="unit" allowedValues={['box', 'whole', 'lg', 'med', 'sm', 'slice', 'piece', 'lb', 'cup', 'tsp', 'tbsp', 'oz', 'can']} placeholder="Select a unit" /></Col>
                      </Row>
                      <Row><TextField id="edit-recipe-ingredientsName" name="name" showInlineError placeholder="Ingredient name" /></Row>
                    </NestField>
                  </ListItemField>
                </ListField>
                <ListField name="instructions" initialCount={1} addIcon={<Plus className="text-black" size={30} />} removeIcon={<TrashFill className="text-black" size={15} />}>
                  <ListItemField name="$" label="">
                    <NestField>
                      <Row><TextField id="edit-recipe-instructions" name="step" label="" showInlineError placeholder="Add step" /></Row>
                    </NestField>
                  </ListItemField>
                </ListField>
                <SelectField className="edit-recipe-tags" name="tags" allowedValues={['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Pescatarian', 'Breakfast', 'Lunch', 'Dinner', 'Snack']} checkboxes inline />
                <SubmitField id="editrecipe-submit" value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default AdminEditRecipe;
