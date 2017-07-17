const metaDataModel = require('../dao/meta-data.js');

exports.getEnglishLevels = (req, res) => {
  metaDataModel.getEnglishLevels((error, result) => {
    if (error) {
      throw error;
    }
    return res.status(200).send(result);
  });
};
