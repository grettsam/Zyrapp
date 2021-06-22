const bcrypt = require("bcryptjs");

const helpers = {};

helpers.encriptador = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const finalpassword = await bcrypt.hash(password, salt);
  return finalpassword;
};

helpers.desencriptador = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e);
  }
};

module.exports = helpers;
