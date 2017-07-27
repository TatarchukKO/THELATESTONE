const TrieSearch = require('trie-search');
const translit = require('translitit-cyrillic-russian-to-latin');

const models = require('../dao/trie-search.js');

const ts = new TrieSearch('name');
models.getCandidates((err, res) => {
  res.forEach((item) => {
    const tmp = {};
    tmp.id = item.id;
    tmp.name = `${item.eng_first_name} ${item.eng_second_name}`;
    ts.add(tmp);
  });
});

function search(name) {
  return ts.get(translit(name));
}

module.exports = {
  search,
  ts,
};
