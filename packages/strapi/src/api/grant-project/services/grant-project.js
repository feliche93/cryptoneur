'use strict';

/**
 * grant-project service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::grant-project.grant-project');
