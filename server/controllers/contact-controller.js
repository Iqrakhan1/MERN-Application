const { restart } = require("nodemon");
const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    // Add contact data to the database
    await Contact.create(response);
    return res.status(200).json({ msg: "Message sent successfully." });
  } catch (err) {
    console.error("Error sending message:", err);
    return res.status(500).json({ msg: "Failed to send message." });
  }
};
module.exports = contactForm;
