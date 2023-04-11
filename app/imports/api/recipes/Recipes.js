import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The RecipeCollection. It encapsulates state and variable values for stuff.
 */
class RecipeCollection {
  constructor() {
    // The name of this collection.
    this.name = 'RecipeCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      picture: String,
      time: String,
      description: String,
      servings: Number,
      owner: String,
      tags: {
        type: Array,
        optional: true,
      },
      'tags.$': String,
      ingredients: {
        type: Array,
        optional: false,
      },
      'ingredients.$': String,
      instructions: {
        type: Array,
        optional: false,
      },
      'instructions.$': String,
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
 * The singleton instance of the RecipeCollection.
 * @type {RecipeCollection}
 */
export const Recipes = new RecipeCollection();
