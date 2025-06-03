# EmailJS Setup Instructions

## Overview
Your portfolio now uses EmailJS to send contact form submissions directly to your email without needing a backend server. This is perfect for static sites hosted on Vercel.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Set Up Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook**
   - **Yahoo**
   - Or any other SMTP service
4. Connect your email account
5. Note down the **Service ID** (e.g., `service_gmail`)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission: {{subject}}

From: {{from_name}} <{{from_email}}>
To: {{to_name}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{reply_to}}
```

4. Template variables to use:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (Shaurya Mani Tripathi)
   - `{{reply_to}}` - Sender's email for replies

5. Note down the **Template ID** (e.g., `template_contact`)

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (User ID)
3. Note it down (e.g., `your_user_id_here`)

### 5. Configure Your Portfolio
1. Open `src/config/emailjs.js`
2. Replace the placeholder values:

```javascript
export const EMAILJS_CONFIG = {
  USER_ID: 'your_actual_user_id_here',     // Your EmailJS Public Key
  SERVICE_ID: 'service_gmail',              // Your Service ID
  TEMPLATE_ID: 'template_contact',          // Your Template ID
};
```

### 6. Test Your Setup
1. Run your development server: `npm start`
2. Navigate to the contact page
3. Fill out and submit the form
4. Check your email for the message

## EmailJS Free Tier Limits
- **200 emails per month**
- Perfect for portfolio websites
- No credit card required

## Troubleshooting

### Common Issues:

1. **"EmailJS is not configured" error**
   - Make sure you've updated all three values in `src/config/emailjs.js`
   - Remove the placeholder text completely

2. **Emails not sending**
   - Check your EmailJS service is connected properly
   - Verify your template ID is correct
   - Check browser console for errors

3. **Emails going to spam**
   - This is normal initially
   - Mark the first email as "Not Spam"
   - Future emails should arrive in inbox

### Environment Variables (Optional)
For extra security, you can use environment variables:

1. Create `.env` file in project root:
```
REACT_APP_EMAILJS_USER_ID=your_user_id
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
```

2. Update `src/config/emailjs.js`:
```javascript
export const EMAILJS_CONFIG = {
  USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
};
```

3. Add environment variables to Vercel:
   - Go to your Vercel project settings
   - Add the environment variables
   - Redeploy your site

## Features Implemented
- ✅ Real email sending via EmailJS
- ✅ Loading states with spinner
- ✅ Success/error messages
- ✅ Form validation
- ✅ Auto-clear messages
- ✅ Disabled submit during sending
- ✅ Responsive design
- ✅ Accessible UI

## Support
If you need help setting up EmailJS, you can:
1. Check the [EmailJS Documentation](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. Test with their online demo first

Your portfolio contact form is now ready to receive real messages! 🚀
