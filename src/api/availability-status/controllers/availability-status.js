'use strict';

/**
 *  availability-status controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::availability-status.availability-status', ({ strapi }) =>  ({
  async create(ctx) {
    // some logic here
		console.log(ctx.body);
		const response = await super.create(ctx);
		// some more logic

		return response;
  }
}));
