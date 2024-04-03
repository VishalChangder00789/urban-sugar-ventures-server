const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "director1.urbansugar@gmail.com",
    pass: "uxcl peka uqex xtgi",
  },
});

app.post("/send-email", (req, res) => {
  const { email, name, enqSubject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "director1.urbansugar@gmail.com",
    subject: enqSubject,
    text: `Hello, My name is ${name}, 
    ${message}  

    Thanks and Regards,
    Name : ${name}.
    Email : ${email}.
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
