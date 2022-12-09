'use strict';

/**
 * blockchain controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blockchain.blockchain');
