const candidatesService = require('../services/candidates.js');
const trie = require('../services/trie-search.js');

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
  candidatesService.getById(req.params.id, (error, result) => {
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
  candidatesService.update(req.params.id, req.body, req.user.id, (error) => {
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

function trieSearch(req, res) {
  const params = req.query.candidate.split(' ');
  if (params.lenght > 2) {
    return res.status(404).send();
  }
  const answer = trie.search(params.join(' '));
  if (answer.length) {
    return res.status(200).send(answer);
  }
  return res.status(404).send();
}

module.exports = {
  get,
  getById,
  insert,
  update,
  search,
  trieSearch,
};
