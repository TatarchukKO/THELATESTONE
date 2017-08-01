const candidatesService = require('../services/candidates');
const trie = require('../services/trie-search');

function get(req, res) {
  candidatesService.get(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

function getById(req, res) {
  candidatesService.getById(req.query.id, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

function insert(req, res) {
  candidatesService.insert(req.body, (error) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send();
  });
}

function update(req, res) {
  candidatesService.update(req.query.id, req.body, req.user.id, (error) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send();
  });
}

function search(req, res) {
  candidatesService.search(req.query, req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.status(200).send(result);
  });
}

function report(req, res) {
  candidatesService.report(req.body, (error, result) => {
    if (error) {
      res.status(500).send();
      throw error;
    }
    return res.xls('report.xlsx', result);
  });
}

function trieSearch(req, res) {
  const params = req.query.candidate.split(' ');
  if (params.lenght > 2) {
    return res.status(404).send();
  }
  trie.search(params.join(' '), (error, answer) => {
    if (answer.length) {
      return res.status(200).send(answer);
    }
    return res.status(404).send();
  });
}

module.exports = {
  get,
  getById,
  insert,
  update,
  search,
  report,
  trieSearch,
};
