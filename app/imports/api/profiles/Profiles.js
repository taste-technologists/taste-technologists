import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ProfileCollection. It encapsulates state and variable values for stuff.
 */
class ProfileCollection {
  constructor() {
    // The name of this collection.
    this.name = 'ProfileCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      userID: String,
      name: String,
      role: String,
      vendor: Boolean,
    });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.generalPublicationName = `${this.name}.publication.general`;
  }
}

/**
 * The singleton instance of the ProfileCollection.
 * @type {ProfileCollection}
 */
export const Profiles = new ProfileCollection();
