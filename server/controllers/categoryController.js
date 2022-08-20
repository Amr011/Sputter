const CategoryModel = require("../models/categoryModel");

class Category {
  // show all categories

  static getAllCategory = (req, res) => {
    let category;

    CategoryModel.find({})

      .then((foundedCategories) => {
        category = foundedCategories;
        if (category != null) {
          return res.status(200).json({
            success: true,
            category: category,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // show single category

  static getCategoryById = (req, res) => {
    let category;

    CategoryModel.findOne({ _id: req.params.id })
      .then((foundedCategories) => {
        category = foundedCategories;
        if (category != null) {
          return res.status(200).json({
            success: true,
            category: category,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // create new category

  static createCategory = (req, res) => {
    let category;

    CategoryModel.create({
      title: req.body.title,
      minAge: req.body.minAge,
      maxAge: req.body.maxAge,
      gender: req.body.gender,
      specialize: req.body.specialize,
      description: req.body.description,
    })
      .then((createdCategory) => {
        category = createdCategory;
        if (category != null) {
          return res.status(200).json({
            success: true,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // update exist category

  static updateCategoryById = (req, res) => {
    let category;

    CategoryModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          minAge: req.body.minAge,
          maxAge: req.body.maxAge,
          gender: req.body.gender,
          specialize: req.body.specialize,
          description: req.body.description,
        },
      },
      { upsert: true }
    )
      .then((updatedCategory) => {
        category = updatedCategory;
        if (category != null) {
          return res.status(200).json({
            success: true,
          });
        } else {
          return res.status(200).json({
            success: false,
          });
        }
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };

  // delete exist category

  static deleteCategoryById = (req, res) => {
    CategoryModel.findOneAndDelete({ _id: req.params.id })
      .then((deletedCategory) => {
        return res.status(200).json({
          success: true,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };
}

// export class controller

module.exports = Category;
