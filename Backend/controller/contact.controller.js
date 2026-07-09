import ContactMessage from "../model/contact.model.js";

export const createContactMessage = async (req, res) => {
  try {
    const { fullName, email, mobile, subject, message } = req.body;

    if (!fullName || !email || !mobile || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const savedMessage = await ContactMessage.create({
      fullName,
      email,
      mobile,
      subject,
      message,
    });

    res.status(201).json({
      message: "Contact message sent successfully",
      contact: savedMessage,
    });
  } catch (error) {
    console.log("Contact error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.log("Contact list error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!deletedMessage) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    res.status(200).json({ message: "Contact message removed successfully" });
  } catch (error) {
    console.log("Contact delete error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
