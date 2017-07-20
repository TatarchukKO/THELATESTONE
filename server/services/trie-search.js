const models = require('../dao/trie-search.js');
const TrieSearch = require('trie-search');

const ts = new TrieSearch('name', {
  splitOnRegEx: 'false',
});
models.getCandidates((err, res) => {
  res.forEach((item) => {
    const tmp = {};
    tmp.id = item.id;
    tmp.name = item.eng_first_name;
    ts.add(tmp);
    tmp.name = item.eng_second_name;
    ts.add(tmp);
    tmp.name = `${item.eng_first_name} ${item.eng_second_name}`;
    ts.add(tmp);
    tmp.name = `${item.eng_second_name} ${item.eng_first_name}`;
    ts.add(tmp);
  });
});


function search(name) {
  console.log(ts.get(name));
  return ts.get(name);
}

module.exports = {
  search,
};
