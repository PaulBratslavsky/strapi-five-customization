/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post', {
  config: {
    find: {
      middlewares: ['api::post.public-post-data'],
    },
    findOne: {
      middlewares: ['api::post.public-post-data'],
    },
  },
});
