// EmailJS Configuration
// Environment variables are loaded from .env file
// Make sure to add REACT_APP_ prefix for React environment variables

export const EMAILJS_CONFIG = {
  // Your EmailJS User ID (Public Key) - from environment variable
  USER_ID: process.env.REACT_APP_EMAILJS_USER_ID,
  
  // Your EmailJS Service ID - from environment variable
  SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  
  // Your EmailJS Template ID - from environment variable
  TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
};

// Template parameters mapping
export const createEmailTemplate = (formData) => ({
  from_name: formData.name,
  from_email: formData.email,
  subject: formData.subject,
  message: formData.message,
  to_name: 'Shaurya Mani Tripathi', // Your name
  reply_to: formData.email,
});

// Validation function to check if all required environment variables are loaded
export const validateEmailJSConfig = () => {
  const { USER_ID, SERVICE_ID, TEMPLATE_ID } = EMAILJS_CONFIG;
  
  // Debug: Log the actual values (remove this in production)
  console.log('EmailJS Config Debug:', {
    USER_ID: USER_ID ? `${USER_ID.substring(0, 8)}...` : 'undefined',
    SERVICE_ID: SERVICE_ID ? `${SERVICE_ID.substring(0, 8)}...` : 'undefined', 
    TEMPLATE_ID: TEMPLATE_ID ? `${TEMPLATE_ID.substring(0, 8)}...` : 'undefined'
  });
  
  if (!USER_ID || !SERVICE_ID || !TEMPLATE_ID) {
    throw new Error(
      'EmailJS configuration is incomplete. Please check your .env file and ensure all REACT_APP_EMAILJS_* variables are set.'
    );
  }
  
  return true;
};
