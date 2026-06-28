const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: '500mdadnansami@gmail.com',
        pass: 'ivrfvgjrtqnwlwpx',
    },
});

const verifyMail = async (email, token)=>{
     try {
        const info = await transporter.sendMail({
            from: '500mdadnansami@gmail.com', // sender address
            to: email, // list of recipients
            subject: "please verify your email", // subject line
            html: `<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden"><tr><td align="center" style="background:#2563eb;padding:30px"><h1 style="margin:0;color:#fff">Verify Your Email</h1></td></tr><tr><td style="padding:40px"><h2 style="color:#333;margin-top:0">Welcome to ${email} 👋</h2><p style="color:#555;line-height:1.7">Thanks for signing up! Please verify your email address by clicking the button below.</p><div style="text-align:center;margin:35px 0"><a href="http://localhost:5173/verifyemail/${token}" style="background:#2563eb;color:#fff;text-decoration:none;padding:14px 28px;border-radius:6px;font-weight:700;display:inline-block">Verify Email</a></div><p style="color:#555;line-height:1.7">If the button doesn't work, copy and paste the following link into your browser:</p><p style="color:#555;line-height:1.7">This link will be expire in<strong>1Day</strong></p><p style="color:#555">Thanks,<br><strong> http://localhost:5173/verifyemail/${token} Team</strong></p></td></tr><tr><td align="center" style="background:#f8f8f8;padding:20px;color:#888;font-size:13px">© 2026 {{APP_NAME}}. All rights reserved.</td></tr></table></td></tr></table></body>`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

const forgotPasswordMail = async (email, token, username)=>{
     try {
        const info = await transporter.sendMail({
            from: '500mdadnansami@gmail.com', // sender address
            to: email, // list of recipients
            subject: "Reset password email", // subject line
            html: `<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,Helvetica,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0"><tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;overflow:hidden"><tr><td align="center" style="background:#111827;padding:30px"><h1 style="color:#fff;margin:0">Your Logo</h1></td></tr><tr><td style="padding:40px;color:#333"><h2 style="margin-top:0">Forgot Your Password?</h2><p style="font-size:16px;line-height:26px">Hi<strong>${username}</strong>,</p><p style="font-size:16px;line-height:26px">We received a request to reset your password. Click the button below to create a new password.</p><table cellpadding="0" cellspacing="0" align="center" style="margin:35px auto"><tr><td align="center" bgcolor="#2563eb" style="border-radius:6px"><a href="http://localhost:5173/resetpassword/${token}" style="display:inline-block;padding:15px 35px;color:#fff;text-decoration:none;font-size:16px;font-weight:700">Reset Password</a></td></tr></table><p style="font-size:15px;line-height:24px">This password reset link will expire in<strong>15 minutes</strong>.</p><p style="font-size:15px;line-height:24px">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p><hr style="border:none;border-top:1px solid #eee;margin:30px 0"><p style="font-size:14px;color:#666">If the button above doesn't work, copy and paste the following URL into your browser:</p><p style="word-break:break-all;color:#2563eb">{{resetLink}}</p></td></tr><tr><td align="center" style="background:#f8f8f8;padding:25px"><p style="margin:0;color:#777;font-size:13px">© 2026 Your Company. All rights reserved.</p><p style="margin-top:8px;color:#999;font-size:12px">This is an automated email. Please do not reply.</p></td></tr></table></td></tr></table></body>`,
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports = {verifyMail, forgotPasswordMail}