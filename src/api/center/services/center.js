'use strict';

/**
 * center service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::center.center', ({ strapi }) =>  ({
	async create(params) {
		// some logic here
		console.log('create', params)
		const { address } = params.data;

		if( address ) {
			// get coordinates from address
			const coordinates = await strapi.services.center.getCoordinatesFromAddress(address);

			if( coordinates ) {
				params.data.lat = coordinates.lat;
				params.data.long = coordinates.long;
			}
		}

		const result = await super.create(params);
	
		return result;
	},

	async update(entityId, params) {
		// some logic here
		const { address } = params.data;

		console.log('update center', address); 	

		if( address ) {
			// get coordinates from address
			const coordinates = await strapi.services.center.getCoordinatesFromAddress(address);

			if( coordinates ) {
				params.data.lat = coordinates.lat;
				params.data.long = coordinates.long;
			}
		}

		params.data.lat = 222;

		const result = await super.update(entityId, params);
	
		return result;
	},

	async getCoordinatesFromAddress(address) {
		const encodedAddress = encodeURIComponent(address);

		return await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json`)
			.then(response => response.json())
			.then(data => {
				if( data.length > 0 ) {
					const lat = parseFloat( data[0].lat );
					const long = parseFloat( data[0].lon );

					return {
						lat: lat,
						long: long
					}
				}
				else {
					return null;
				}
		})
	}
}));
