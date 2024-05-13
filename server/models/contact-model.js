const { Schema, model, default: mongoose } = require("mongoose");

const contactSchema = new Schema({
  userName: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
});

const Contact = new model("contact", contactSchema);
module.exports = Contact;
