import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { Vendor } from '../../api/vendor/Vendors';

const bridge = new SimpleSchema2Bridge(Vendor.schema);

/* Renders the EditVendor page for editing a single document. */
const EditVendor = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // console.log('EditVendor', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Vendor documents.
    const subscription = Meteor.subscribe(Vendor.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Vendor.collection.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);
  // console.log('EditVendor', doc, ready);
  // On successful submit, insert the data.
  const submit = (data) => {
    const { name, hours, location } = data;
    Vendor.collection.update(_id, { $set: { name, hours, location } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Vendor updated successfully', 'success')));
  };

  return ready ? (
    <Container className="py-3" id="edit-vendor-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Vendor</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="name" id="edit-vendor-form-name" label="Store" showInlineError />
                <TextField name="hours" id="edit-vendor-form-hours" label="Hours of Operation" showInlineError />
                <TextField name="location" id="edit-vendor-form-location" placeholder="Please input address" showInlineError />
                <SubmitField id="edit-vendor-form-submit" value="Submit" />
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

export default EditVendor;
