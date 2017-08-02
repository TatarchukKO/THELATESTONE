function get(type) {
  const query = [];
  query[0] = `SELECT users.id, first_name, second_name
    FROM users
    WHERE users.type = `;
  query[1] = `"${type}"`;
  if (type === 'HRM') {
    query[2] = ' OR users.type = "admin"';
  }
  return query.join(' ');
}

module.exports = {
  get,
};
