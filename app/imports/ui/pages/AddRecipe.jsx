import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, ListField, ListItemField, LongTextField, NestField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Plus, TrashFill } from 'react-bootstrap-icons';
import { Recipes } from '../../api/recipes/Recipes';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  picture: String,
  time: String,
  description: String,
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
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddStuff page for adding a document. */
const AddStuff = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, picture, time, description, servings, tags, ingredients, instructions } = data;
    const owner = Meteor.user().username;
    Recipes.collection.insert(
      { name, picture, time, description, servings, owner, tags, ingredients, instructions },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={8}>
          <Col className="text-center"><h2>Add Recipe</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <Row>
                  <Col><TextField name="name" showInlineError placeholder="Recipe name" /></Col>
                  <Col><TextField name="picture" showInlineError placeholder="Recipe picture URL" /></Col>
                </Row>
                <Row>
                  <Col><TextField name="time" showInlineError placeholder="Time" /></Col>
                  <Col><NumField name="servings" decimal={null} min="0" /></Col>
                </Row>
                <LongTextField name="description" placeholder="Describe the recipe here" />
                <ListField name="ingredients" initialCount={1} addIcon={<Plus className="text-black" size={30} />} removeIcon={<TrashFill className="text-black" size={15} />}>
                  <ListItemField name="$">
                    <NestField>
                      <Row>
                        <Col><NumField name="quantity" min="0" /></Col>
                        <Col><SelectField name="unit" allowedValues={['lb', 'cup', 'tsp', 'tbsp', 'oz']} placeholder="Select a unit" /></Col>
                      </Row>
                      <Row><TextField name="name" showInlineError placeholder="Ingredient name" /></Row>
                    </NestField>
                  </ListItemField>
                </ListField>
                <ListField name="instructions" initialCount={1} addIcon={<Plus className="text-black" size={30} />} removeIcon={<TrashFill className="text-black" size={15} />}>
                  <ListItemField name="$" label="">
                    <NestField>
                      <Row><TextField name="step" label="" showInlineError placeholder="Add step" /></Row>
                    </NestField>
                  </ListItemField>
                </ListField>



                <SelectField name="tags" allowedValues={['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Pescatarian', 'Breakfast', 'Lunch', 'Dinner', 'Snack']} checkboxes inline />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddStuff;
