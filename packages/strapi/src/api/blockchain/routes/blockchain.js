'use strict';

/**
 * blockchain router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::blockchain.blockchain');
