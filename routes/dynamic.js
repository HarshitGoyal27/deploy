/* eslint-disable no-undef */
const Router = require('express')
// const{} = require('../middlewares/auth/auth.middleware');
const dynamicController = require('../controller/dynamicController');
const router = Router();
router.use(Router.json());
router.post('/sap-develoepr',dynamicController.getSAP);
router.post('/cloud-develoepr',dynamicController.getCloud);
router.post('/legacy-develoepr',dynamicController.getLegacy);
module.exports = router;