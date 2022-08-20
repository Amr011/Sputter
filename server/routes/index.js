const express = require("express");

const router = express.Router();

// Calling Operation Controllers
const minerControll = require("../controllers/Miner");
const dispenserControll = require("../controllers/Dispenser");
const validatorControll = require("../controllers/Validator");

// Calling Statistics Controllers
const categoryControll = require("../controllers/categoryController");
const pageControll = require("../controllers/pageController");
const userControll = require("../controllers/userContorll");
const personControll = require("../controllers/personController");

// Sputter Operation API Manager

// Miner Controller
router.get("/api/miner", minerControll.Lancher);
// Dispenser Controller
router.get("/api/dispenser", dispenserControll.Lancher);
// Validator Controller
router.get("/api/validator", validatorControll.Lancher);

/*
 *
 *
 *      API
 *
 *
 */

// Person API

// Get All Person
router.get("/api/person", personControll.getAllPerson);

// Get All Person from page from category
router.get("/api/person/page", personControll.getAllPersonByPageId);

// Get All Person public true
router.get("/api/person/public", personControll.getAllPersonPublic);

// Category API

// Get All Category API
router.get("/api/category", categoryControll.getAllCategory);

// Get Single Category API
router.get("/api/category/:id", categoryControll.getCategoryById);

// Create New Category API
router.post("/api/category", categoryControll.createCategory);

// Update Exist Category API
router.put("/api/category/:id", categoryControll.updateCategoryById);

// Delete Exist Category API
router.delete("/api/category/:id", categoryControll.deleteCategoryById);

// Category => page API

// Get All Pages By Category id API
router.get("/api/category/:catid/page", pageControll.getAllPage);

// Get Single Page By Category id API
router.get("/api/category/:catid/page/:pageid", pageControll.getPageById);

// Create New Page By Category id API
router.post("/api/category/:catid/page/", pageControll.createPage);

// Update Exist Page By Category id API
router.put("/api/category/:catid/page/:pageid", pageControll.updatePageById);

// Delete Exist Page By Category id API
router.delete("/api/category/:catid/page/:pageid", pageControll.deletePageById);

// User API

// Get All User
router.get("/api/user", userControll.getAllUser);

// Get Single User
router.get("/api/user/:id", userControll.getUserById);

// Create New User
router.post("/api/user", userControll.creatUser);

// Update Exist User
router.put("/api/user/:id", userControll.updateUserById);

// Delete Exist User
router.delete("/api/user/:id", userControll.deleteUserById);

module.exports = router;
