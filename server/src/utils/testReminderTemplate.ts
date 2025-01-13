import Handlebars from "handlebars";

const testReminderTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color:rgb(20, 84, 174);
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
        }
        .email-body {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .email-body p {
            margin: 10px 0;
        }
        .email-footer {
            text-align: center;
            padding: 20px;
            background-color: #f1f1f1;
            font-size: 14px;
            color: #888888;
        }
        .email-footer a {
            color:rgb(23, 93, 191);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Test Reminder
        </div>
        <div class="email-body">
            <p>Hi <strong>{{userName}}</strong>,</p>
            <p>This is a friendly reminder that your test is scheduled for:</p>
            <p><strong>Date:</strong> {{testDate}}</p>
            <p>Make sure you are prepared and ready to give your best! If you have any questions or need assistance, feel free to reach out to us.</p>
            <p>Good luck with your test!</p>
            <p>Best regards,</p>
            <p><strong>The TestPrep Team</strong></p>
        </div>
        <div class="email-footer">
            © TestPrep. All rights reserved.<br>
            Need help? <a href="mailto:support@testprep.com">Contact Support</a>
        </div>
    </div>
</body>
</html>
`

export const compileTestReminderTemplate = Handlebars.compile(testReminderTemplate);