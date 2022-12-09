'use strict';

/**
 * grant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grant.grant');
