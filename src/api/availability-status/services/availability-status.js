'use strict';

/**
 * availability-status service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::availability-status.availability-status', ({ strapi }) =>  ({


  // // Method 2: Wrapping a core service (leaves core logic in place)
  // async find(...args) {  
  //   // Calling the default core controller
  //   const { results, pagination } = await super.find(...args);

  //   // some custom logic
  //   results.forEach(result => {
  //     result.counter = 1;
  //   });

  //   return { results, pagination };
  // },

  // // Method 3: Replacing a core service
  // async findOne(entityId, params = {}) {
  //   return strapi.entityService.findOne('api::restaurant.restaurant', entityId, this.getFetchParams(params));
  // }
	async create(params) {
		// some logic here
		const { centerId, vaccineId } = params.data;

		// match centerId foreign key to local centerId
		if( centerId ) {
			// find the center by center id attribute 
			const center = await strapi.db.query('api::center.center').findOne({ where: { centerId: centerId } });

			if( center ) {
				// remove centerId from params.data
				delete params.data.centerId;

				// add center to params.data
				params.data.center = center.id;
			}
		}

		// match vaccineId foreign key to local vaccineId
		if( vaccineId ) {
			// find the center by center id attribute 
			const vaccine = await strapi.db.query('api::vaccine.vaccine').findOne({ where: { vaccineId: vaccineId } });

			if( vaccine ) {
				// remove centerId from params.data
				delete params.data.vaccineId;

				// add center to params.data
				params.data.vaccine = vaccine.id;
			}
		}

		const result = await super.create(params);
	
		return result;
	}
}))
