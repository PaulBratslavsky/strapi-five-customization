/**
 * `post-pupulate` middleware
 */

import _ from 'lodash';

import type { Core } from '@strapi/strapi';

const defaultPopulate = {
    author: {
      fields: ['username', 'email'],
    },
};

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {

    console.log('#################################');
    console.log('In post-pupulate middleware.');
    console.log('#################################');


    const query = ctx.query;



    const mergedPopulate = _.merge(query.populate, defaultPopulate);

    console.log('mergedPopulate', mergedPopulate);


    ctx.query = {
      ...query,
      populate: mergedPopulate,
    };

    console.log('ctx.query', ctx.query);  



    await next();
  };
};
