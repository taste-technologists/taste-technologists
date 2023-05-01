import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Inventory } from '../../api/vendor/VendorInventory';
import { Vendor } from '../../api/vendor/Vendors';
import LoadingSpinner from '../components/LoadingSpinner';

// Create a schema to specify the structure of the data to appear in the form.

const bridge = new SimpleSchema2Bridge(Inventory.schema);

/* Renders the AddInventory page for adding a document. */
const AddInventory = () => {
  const toTitleCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  const { _id } = useParams();
  // console.log('EditStuff', _id);
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { vendorName, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Vendor.generalPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Vendor.collection.findOne(_id);
    let name;
    if (rdy) {
      name = document.name;
    }
    return {
      vendorName: name,
      ready: rdy,
    };
  }, [_id]);
  console.log(vendorName);
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { name, item, price, size } = data;
    Inventory.collection.insert(
      { name, item: toTitleCase(item), price, size },
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
  return ready ? (
    <Container className="py-3" id="add-inventory-page">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Inventory </h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card className="uniform">
              <Card.Body>
                <TextField name="name" id="add-inventory-form-name" label="Name" disabled value={vendorName} />
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
  ) : <LoadingSpinner />;
};

export default AddInventory;
