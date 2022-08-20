const personModel = require("../models/personModel");

class Person {
  // show all person in database
  static getAllPerson = (req, res) => {
    let person = [];

    personModel
      .find({})
      .then((foundedPerson) => {
        person = foundedPerson;
        if (person != null) {
          return res.status(200).json({
            success: true,
            pepole: person.length,
            person: person,
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
  // get pepole from page id
  static getAllPersonByPageId = (req, res) => {
    let person = [];

    personModel
      .find({ page: req.body.pagid })

      .then((foundedPerson) => {
        person = foundedPerson;
        if (person != null) {
          return res.status(200).json({
            success: true,
            pepole: person.length,
            person: person,
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

  // get public or private accounts from page id
  static getAllPersonPublic = (req, res) => {
    let person = [];

    personModel
      .find({ page: req.body.pagid, public: true })
      .limit(30)
      .then((foundedPerson) => {
        person = foundedPerson;
        if (person != null) {
          return res.status(200).json({
            success: true,
            pepole: person.length,
            person: person,
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
}

module.exports = Person;
