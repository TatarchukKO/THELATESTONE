const candidatesService = require('../services/candidates');
const trie = require('../services/trie-search');

function get(req, res) {
  candidatesService.get(req.body, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getById(req, res) {
  candidatesService.getById(req.query.id, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  candidatesService.insert(req.body, req.user.id, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(201).send();
  });
}

function validate(req, res) {
  candidatesService.validate(req.query.email, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(result).send();
  });
}

function update(req, res) {
  candidatesService.update(req.query.id, req.body, req.user.id, (error) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send();
  });
}

function search(req, res) {
  candidatesService.search(req.query, req.body, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

function report(req, res) {
  console.log(req.query);
  candidatesService.report(req.query, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename= report.xlsx');
    res.end(result, 'binary');
  });
}

function trieSearch(req, res) {
  const params = req.query.candidate.split(' ');
  if (params.lenght > 2) {
    return res.status(404).send();
  }
  trie.search(params.join(' '), (error, answer) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    if (answer.length) {
      return res.status(200).send(answer);
    }
    return res.status(200).send([]);
  });
}

function getHistory(req, res) {
  candidatesService.getHistory(req, (error, result) => {
    if (error) {
      res.sendStatus(500);
      throw error;
    }
    return res.status(200).send(result);
  });
}

module.exports = {
  get,
  getById,
  getHistory,
  insert,
  validate,
  update,
  search,
  report,
  trieSearch,
};
