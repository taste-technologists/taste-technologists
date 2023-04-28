import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, ListField, ListItemField, LongTextField, NestField, SelectField, SubmitField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { addReviewMethod } from '../../startup/both/Methods';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  review: {
    type: Array,
    optional: true,
  },
  'review.$': {
    type: Object,
  },
  'review.$.rating': Number,
  'review.$.comment': {
    type: String,
    max: 500,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddReview page for adding a document. */
const AddReview = ({ name, recipeId, userID, user }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { rating, comment } = data.review[0];
    const reviewInfo = { userID, user, rating: Number(rating), comment, created: new Date(), edited: new Date() };
    // console.log(reviewInfo);
    // console.log(recipeId);
    Meteor.call(addReviewMethod, { recipeId, reviewInfo }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Review added successfully', 'success');
        formRef.reset();
      }
    });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center"><h2>Add Review for {name}</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                Note: This will overwrite any current review you may have for this recipe.
                <ListField name="review" initialCount={1}>
                  <ListItemField name="$" label="">
                    <NestField>
                      <Row>
                        <Col><SelectField name="rating" id="rating" allowedValues={[1, 2, 3, 4, 5]} placeholder="Select a rating" /></Col>
                      </Row>
                      <Row><LongTextField name="comment" id="review-comment" showInlineError placeholder="Add a comment" /></Row>
                    </NestField>
                  </ListItemField>
                </ListField>
                <SubmitField value="Submit" id="review-form-submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddReview.propTypes = {
  name: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};
export default AddReview;
