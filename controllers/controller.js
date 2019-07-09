const db = require("../models");

module.exports = {
  getUniqueRegions: (req, res) => {
    db.Avocado
      .find()
      .distinct('region')
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  getData: (req, res) => {
    db.Avocado
      .find({region: req.params.region})
      .then(data => res.json(data)) 
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Avocado
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Avocado
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Avocado
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Avocado
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
