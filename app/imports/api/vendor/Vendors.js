import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The VendorCollection. It encapsulates state and variable values for the VendorInventory.
 */
class VendorCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      location: String,
      hours: String,
      vendor: {
        type: Array,
        optional: true,
      },
      'vendor.$': String,
    });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.generalPublicationName = `${this.name}.publication.general`;
  }
}

/**
 * The singleton instance of the RecipeCollection.
 * @type {VendorCollection}
 */
export const Vendor = new VendorCollection();
