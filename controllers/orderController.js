const nodemailer = require("nodemailer");
const createError = require("http-errors");

const sendEmail = async (req, res, next) => {
    try {
        const { email, orderId, firstName, lastName, country, address, landmark, quantity, productId } = req.body;

        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "abhishekpandey7676@gmail.com",
                pass: "wkrk gkte lcqm fiql",
            },
        });

        const mailDetails = {
            from: "abhishekpandey7676@gmail.com",
            subject: "Order Confirmation",
            to: email,
            text: `Hello ${firstName} ${lastName},

            We are pleased to confirm your order with the following details:
            Order ID: ${orderId}
            Product ID: ${productId}
            Quantity: ${quantity}
            Shipping Address: ${address}, ${landmark}, ${country}

            Your account details:
            Username: ${email}
            Password: ${firstName}

            Thank you for shopping with us!`,
            html: `
        <html>
        <head><title>Order Confirmation</title></head>
        <body>
          <h1>Order Confirmation</h1>
          <p>Dear ${firstName} ${lastName},</p>
          <p>Thank you for your order. </p>
          <p>Your account details:</p>
          <ul>
            <li><b>Username:</b> ${email}</li>
            <li><b>Password:</b> ${firstName}</li>
          </ul>
          <p>Here are the details:</p>
          <ul>
            <li><b>Order ID:</b> ${orderId}</li>
            <li><b>Product ID:</b> ${productId}</li>
            <li><b>Quantity:</b> ${quantity}</li>
            <li><b>Shipping Address:</b> ${address}, ${landmark}, ${country}</li>
          </ul>
          <p>We will notify you once the order has been shipped.</p>
          <p>Thank you for shopping with us!</p>
        </body>
        </html>
      `,
        };

        await mailTransporter.sendMail(mailDetails);

        res.status(200).json({ message: "Email Sent Successfully" });
    } catch (err) {
        console.log(err);
        return next(createError(500, "Something went wrong while sending the email"));
    }
};

module.exports = {
    sendEmail,
};
