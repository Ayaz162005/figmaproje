import nodemailer from "nodemailer";

const SendEmail = (email, type = "classic", url) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "ummanayaz07@gmail.com",
      pass: "xsmtpsib-d6009bcb23a06a81d26c1d9765b380f70ffc06152a4006ce792f479c911858ac-KRGnkrxcWUa6w4Az",
    },
  });

  const mailOptions = {
    from: "ayaz@gmail.com",
    to: email,
    subject: `${
      type == "classic"
        ? "Join Our Community"
        : "Reset password (valid 5 minute)"
    }`,
    text: "That was easy!",
    html: `${
      type === "classic"
        ? `<div>
      <h1>Thanks for Joining!</h1>
      <p>We are very happy.</p>
    </div>`
        : `<div>
        <h1>This is your password reset message</h1>
        <p>Never share your information with somebody</p>
        <p>This is your url: ${url}</p>
        <a href="${url}" target="_blank">
        Click
        </a>
        
        </div>`
    }`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default SendEmail;
