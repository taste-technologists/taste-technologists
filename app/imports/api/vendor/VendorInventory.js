import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The VendorInventoryCollection. It encapsulates state and variable values for the VendorInventory.
 */
class VendorInventoryCollection {
  constructor() {
    // The name of this collection.
    this.name = 'VendorInventoryCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      item: String,
      price: Number,
      size: String,
    });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.vendorPublicationName = `${this.name}.publication.vendor`;
  }
}

/**
 * The singleton instance of the RecipeCollection.
 * @type {VendorInventoryCollection}
 */
export const Inventory = new VendorInventoryCollection();
