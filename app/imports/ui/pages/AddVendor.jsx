import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Vendor } from '../../api/vendor/Vendors';

// Create a schema to specify the structure of the data to appear in the form.

const bridge = new SimpleSchema2Bridge(Vendor.schema);

/* Renders the AddVendor page for adding a document. */
const AddVendor = () => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, hours, location } = data;
    Vendor.collection.insert(
      { name, hours, location },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vendor added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3" id="add-vendor-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Vendor</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card className="uniform">
              <Card.Body>
                <TextField name="name" id="add-vendor-form-name" label="Store" showInlineError />
                <TextField name="hours" id="add-vendor-form-hours" label="Hours of Operation" showInlineError />
                <TextField name="location" id="add-vendor-form-location" placeholder="Please input address" showInlineError />
                <SubmitField id="add-vendor-form-submit" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVendor;
