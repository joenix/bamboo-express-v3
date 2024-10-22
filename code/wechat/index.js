/**
 * Code by Joenix
 * ======== ======== ========
 */

// Import Router
const router = require('express').Router();

// Import Utils
const { catcher } = require('../utils');

// Use Router
router.route('/').post(wechat_handle);

// Use Handle
async function wechat_handle(request, response) {

    const msg = catcher();

  try {
    response.json({
      status: 200,
      msg
    });
  } catch (msg) {
    response.json({ status: 500, msg });
  }
}

// Exporting
module.exports = router;
