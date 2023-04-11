import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
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
  },
  'ingredients.$': String,
  instructions: {
    type: Array,
  },
  'instructions.$': String,
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
                <LongTextField name="ingredients" placeholder="Describe the recipe ingredients here" />
                <LongTextField name="instructions" placeholder="Describe the recipe instructions here" />
                <SelectField name="tags" allowedValues={['Vegan', 'Quick', 'Dairy', 'Snack', 'Breakfast', 'Lunch', 'Dinner']} checkboxes inline />
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
