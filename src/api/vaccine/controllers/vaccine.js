'use strict';

/**
 *  vaccine controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::vaccine.vaccine');
