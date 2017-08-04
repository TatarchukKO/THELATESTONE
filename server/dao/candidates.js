const async = require('async');

const query = require('../queries/candidate-queries');
const connection = require('./connection').connection;
const ts = require('../services/trie-search');

function get(skip, amount, filter, callback) {
  connection.query(query.get(skip, amount, filter), callback);
}

function getById(id, callback) {
  async.parallel([
    call => connection.query(query.getById(id), call),
    call => connection.query(query.getEmails(id), call),
    call => connection.query(query.getSecondarySkills(id), call),
    call => connection.query(query.getOtherSkills(id), call),
  ], callback);
}

function insert(candidate, emails, secSkills, oSkills, metaphone, callback) {
  connection.beginTransaction((transError) => {
    console.log(candidate);
    if (transError) {
      throw transError;
    }
    connection.query(query.insert(), candidate, (error, res) => {
      if (error) {
        return connection.rollback(() => {
          throw error;
        });
      }
      const id = res.insertId;
      const meta = metaphone;
      meta.candidate_id = id;
      async.parallel(
        Array.prototype.concat(
        call => connection.query(query.insertMeta(), meta, call),
        emails.map(val => call => connection.query(query.insertEmails(id, val), call)),
        secSkills.map(val => call => connection.query(query.insertSecSkills(id, val), call)),
        oSkills.map(val => call => connection.query(query.insertOtherSkills(id, val), call))),
        (parError, result) => {
          if (parError) {
            return connection.rollback(() => {
              throw parError;
            });
          }
          connection.commit((commitError) => {
            if (commitError) {
              return connection.rollback(() => {
                throw commitError;
              });
            }
            callback(error, result);
            console.log('Insert transaction has been commited');
            return ts.insert({
              id,
              name: `${candidate.eng_first_name} ${candidate.eng_second_name}`,
            });
          });
        });
    });
  });
}

function validate(email, callback) {
  connection.query(`SELECT * FROM candidate_emails
    WHERE email = "${email}"`, callback);
}

function deleteRuName(name, id, call) {
  if (name) {
    return call(null, null);
  }
  return connection.query(query.deleteRuName(id), call);
}

function updateSecSkill(secSkills, id, call) {
  if (secSkills.length !== 0) {
    return connection.query(query.deleteSecSkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        secSkills.map(val => sCall => connection.query(query.insertSecSkills(id, val), sCall)),
        call);
    });
  }
  return call(null, null);
}

function updateEmails(emails, id, call) {
  if (emails.length !== 0) {
    return connection.query(query.deleteEmails(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        emails.map(val => eCall => connection.query(query.insertEmails(id, val), eCall)),
        call);
    });
  }
  return call(null, null);
}

function updateOtherSkills(oSkills, id, call) {
  if (oSkills.length !== 0) {
    return connection.query(query.deleteOtherSkills(id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return async.parallel(
        oSkills.map(val => oCall => connection.query(query.insertOtherSkills(id, val), oCall)),
        call);
    });
  }
  return call(null, null);
}

function updateMeta(meta, call) {
  if (meta.candidate_id) {
    return connection.query(query.deleteMeta(meta.candidate_id), (err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      return connection.query(query.insertMeta(), meta, call);
    });
  }
  return call(null, null);
}

function update(id, candidate, emails, secSkills, oSkills, changes, meta, callback) {
  connection.beginTransaction((transError) => {
    if (transError) {
      throw transError;
    }
    async.parallel([
      call => connection.query(query.update(id), candidate, call),
      call => deleteRuName(candidate.ru_first_name, id, call),
      call => updateEmails(emails, id, call),
      call => updateSecSkill(secSkills, id, call),
      call => updateOtherSkills(oSkills, id, call),
      call => updateMeta(meta, call),
      call => connection.query(query.commitChanges(), changes, (error, result) =>
        connection.query(query.generalHistory(result.insertId), call))],
      (error, result) => {
        if (error) {
          return connection.rollback(() => {
            throw error;
          });
        }
        connection.commit((commitError) => {
          if (commitError) {
            return connection.rollback(() => {
              throw commitError;
            });
          }
          callback(error, result);
          console.log('Update transaction has been commited');
          if (candidate.eng_first_name) {
            return ts.insert({
              id,
              name: `${candidate.eng_first_name} ${candidate.eng_second_name}`,
            });
          }
        });
      });
    return undefined;
  });
}

function search(params, skip, amount, filter, callback) {
  return connection.query(query.search(params, skip, amount, filter), callback);
}

function searchByEmail(params, skip, amount, filter, callback) {
  return connection.query(query.searchByEmail(params, skip, amount, filter), callback);
}

function searchBySkype(params, skip, amount, filter, callback) {
  return connection.query(query.searchBySkype(params, skip, amount, filter), callback);
}

function report(span, filter, callback) {
  connection.query(query.report(span, filter), callback);
}

function getHistory(vacancyId, callback) {
  connection.query(query.getHistory(vacancyId), callback);
}


module.exports = {
  get,
  getById,
  getHistory,
  insert,
  validate,
  update,
  search,
  searchByEmail,
  searchBySkype,
  report,
};
