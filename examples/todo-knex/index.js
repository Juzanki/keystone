const { Keystone } = require('@keystone-next/keystone-legacy');
const { KnexAdapter } = require('@keystone-next/adapter-knex-legacy');
const { Text } = require('@keystone-next/fields-legacy');
const { GraphQLApp } = require('@keystone-next/app-graphql-legacy');
const { AdminUIApp } = require('@keystone-next/app-admin-ui-legacy');
const { StaticApp } = require('@keystone-next/app-static-legacy');

const keystone = new Keystone({
  adapter: new KnexAdapter({ knexOptions: { connection: 'postgres://localhost/to-do' } }),
});

keystone.createList('Todo', {
  schemaDoc: 'A list of things which need to be done',
  fields: {
    name: { type: Text, schemaDoc: 'This is the thing you need to do', isRequired: true },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new StaticApp({ path: '/', src: 'public' }),
    // Setup the optional Admin UI
    new AdminUIApp({ name: 'Keystone To-Do List', enableDefaultRoute: true }),
  ],
};
