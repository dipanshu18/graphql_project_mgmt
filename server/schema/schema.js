import Client from "../model/Client.js";
import Project from "../model/Project.js";

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

// GraphQL Schema for Project and Client
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve: (parent, args) => {
        return Client.findById(parent.clientId);
      },
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

// Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // Get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve: (parent, args) => {
        return Client.find();
      },
    },
    // Get a specific client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Client.findById(args.id);
      },
    },
    // Get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    // Get a specific project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        return Client.create({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });
      },
    },
    // Update client
    updateClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return Client.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              phone: args.phone,
            },
          },
          { new: true }
        );
      },
    },
    // Delete client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        Project.deleteMany({ clientId: args.id });
        return Client.findByIdAndDelete(args.id);
      },
    },
    // Add project
    addProject: {
      type: ProjectType,
      args: {
        clientId: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatus",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
          defaultValue: "Not Started",
        },
      },
      resolve: (parent, args) => {
        return Project.create({
          clientId: args.clientId,
          name: args.name,
          description: args.description,
          status: args.status,
        });
      },
    },
    // Update project
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProjectStatusUpdate",
            values: {
              new: { value: "Not Started" },
              progress: { value: "In Progress" },
              completed: { value: "Completed" },
            },
          }),
        },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
    // Delete project
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        return Project.findByIdAndDelete(args.id);
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;
