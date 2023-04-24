import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Inventory } from '../../api/vendor/VendorInventory';

// Create a schema to specify the structure of the data to appear in the form.

const bridge = new SimpleSchema2Bridge(Inventory.schema);

/* Renders the AddInventory page for adding a document. */
const AddInventory = () => {
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, item, price, size } = data;
    Inventory.collection.insert(
      { name, item, price, size },
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
    <Container className="py-3" id="add-inventory-page">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Inventory </h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" id="add-inventory-form-name" label="Name" showInlineError placeholder="Ex: Safeway" />
                <TextField name="item" id="add-inventory-form-item" label="Item" showInlineError />
                <TextField name="price" id="add-inventory-form-price" label="Price ($)" showInlineError />
                <TextField name="size" id="add-inventory-form-size" placeholder="Ex: 7 oz" showInlineError />
                <SubmitField id="add-inventory-form-submit" value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddInventory;
