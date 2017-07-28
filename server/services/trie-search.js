const TrieSearch = require('trie-search');
const translit = require('translitit-cyrillic-russian-to-latin');
const redis = require('redis');

const models = require('../dao/trie-search.js');

const client = redis.createClient(6379, 'localhost');
client.on('connect', () => console.log('Connected to Redis'));
client.on('error', err => console.log(err));
const ts = new TrieSearch('name');
models.getCandidates((err, res) => {
  res.forEach((item) => {
    const tmp = {};
    tmp.id = item.id;
    tmp.name = `${item.eng_first_name} ${item.eng_second_name}`;
    ts.add(tmp);
  });
  client.set('root', JSON.stringify(ts.root), (error) => {
    if (error) {
      throw error;
    }
  });
});

function insert(item) {
  return client.get('root', (err, root) => {
    ts.root = JSON.parse(root);
    ts.add(translit(item));
    client.set('root', JSON.stringify(root), (error) => {
      if (error) {
        throw error;
      }
    });
  });
}

function search(name, callback) {
  return client.get('root', (err, root) => {
    ts.root = JSON.parse(root);
    const item = ts.get(translit(name));
    callback(err, item);
  });
}

module.exports = {
  search,
  insert,
};
