const nodemailer = require("nodemailer");
require("dotenv").config();
const { asyncHandler } = require("./asyncHandler");
const { tempUpload } = require("./multerSetup");

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_TEST_EMAIL,
    pass: process.env.MAIL_TEST_PASSWORD,
  },
});

// Send Mail Function
const sendMailWithAttachment = [
  tempUpload.single("file"),
  asyncHandler(async (req, res, next) => {
    const user = req.user;
    const recieverEmail = user.email;
    let attachment = null;

    const { subject, mailBody, htmlBody } = req.body;

    if (!subject || (!mailBody && !htmlBody)) {
      throw new Error("Cannot send mail!Provide subject and body");
    }

    if (req.file) {
      attachment = req.file.buffer;
    }
    try {
      const mailOptions = {
        from: process.env.MAIL_TEST_EMAIL,
        to: recieverEmail,
        subject: subject,
        text: mailBody,
        html: htmlBody || "",
        attachments: [
          {
            filename: req.file ? req.file.originalname : "attachment",
            content: attachment,
          },
        ],
      };
      // Send email
      const info = await transporter.sendMail(mailOptions);

      res.status(200).json({
        success: true,
        message: "Mail sent successfully!",
        info: info,
      });
    } catch (error) {
      throw new Error(`Error sending mail: ${error.message}`);
    }
  }),
];

module.exports = { sendMailWithAttachment };
