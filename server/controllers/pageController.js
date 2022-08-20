const PageModel = require("../models/pageModel");

class Page {
  // show all pages

  static getAllPage = (req, res) => {
    let page;

    PageModel.find({
      category: req.params.catid,
    })
      .then((foundedPages) => {
        page = foundedPages;
        if (page != null) {
          return res.status(200).json({
            success: true,
            page: page,
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

  // show single page

  static getPageById = (req, res) => {
    let page;

    PageModel.findOne({
      _id: req.params.pageid,
      category: req.params.catid,
    })
      .then((foundedPage) => {
        page = foundedPage;
        if (page != null) {
          return res.status(200).json({
            success: true,
            page: page,
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

  // create new page

  static createPage = (req, res) => {
    let page;

    PageModel.create({
      tagName: req.body.tagName,
      url: req.body.url,
      category: req.params.catid,
    })
      .then((createdPage) => {
        page = createdPage;
        if (page != null) {
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

  // update exist page

  static updatePageById = (req, res) => {
    let page;
    PageModel.findOneAndUpdate(
      {
        _id: req.params.pageid,
        category: req.params.catid,
      },
      {
        $set: {
          tagName: req.body.tagName,
          url: req.body.url,
          category: req.body.category,
        },
      },
      { upsert: true }
    )
      .then((updatedPage) => {
        page = updatedPage;
        if (page != null) {
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

  // delete exist page

  static deletePageById = (req, res) => {
    PageModel.findOneAndDelete({
      _id: req.params.pageid,
      category: req.params.catid,
    })
      .then((deletedPage) => {
        return res.statues(200).json({
          success: true,
        });
      })
      .catch((err) => {
        return res.statues(400).json({
          message: "Unexpected Error",
          error: err,
        });
      });
  };
}

// export class controller

module.exports = Page;
