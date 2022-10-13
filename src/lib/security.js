const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.encrypt = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.compare = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

exports.createToken = () => {
  // Ein sicherer Weg ein zufälliges Token zu generieren ist die crypto-Bibliothek.
  // Wir wandeln das Ergebnis in einen base64-String um, damit er problemlos in einem http header transportiert werden kann
  return crypto.randomBytes(48).toString("base64");
};
