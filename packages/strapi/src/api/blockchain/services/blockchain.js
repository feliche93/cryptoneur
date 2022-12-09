'use strict';

/**
 * blockchain service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::blockchain.blockchain');
