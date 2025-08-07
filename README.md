Advanced Authentication Implementation
This project demonstrates a complete backend and frontend implementation of advanced user authentication features, including email verification, password reset, login/logout functionality, and more.

🔧 Backend Setup
🗄️ Database Setup
MongoDB is used for the database. Make sure to have a MongoDB account and a URI to connect to your database.

🔐 Signup Endpoint
Handles user registration by creating a new user in the database.
The user receives a verification email to confirm their account.

📧 Sending Verify Account Email
Utilizes Mailtrap (or another SMTP service) to send a verification email after signup.

🔍 Verify Email Endpoint
Verifies the user’s email by clicking on the verification link sent via email.

Updates the user’s status in the database.

📄 Building a Welcome Email Template
Customize an email template that will be sent to the user for account verification.

🚪 Logout Endpoint
Logs the user out by clearing the authentication token from the client.

🔑 Login Endpoint
Handles user login, generates a JWT token, and sends it to the client for session management.

🔄 Forgot Password Endpoint
Allows users to request a password reset by sending an email with a reset link.

🔁 Reset Password Endpoint
Resets the user's password after they click on the password reset link.

✔️ Check Auth Endpoint
Verifies if a user is authenticated by checking the validity of the JWT token.

🌐 Frontend Setup
📋 Signup Page UI
A user-friendly signup page where users can register with their details.

🔓 Login Page UI
A login page for users to enter their credentials and access their account.

✅ Email Verification Page UI
A page that users are redirected to after they click the verification link in their email.

📤 Implementing Signup
Integrates the signup process with the backend to register a new user.

📧 Implementing Email Verification
The frontend listens for the verification status and updates the user once verified.

🔒 Protecting Our Routes
Ensures that certain routes (like the dashboard) are only accessible if the user is authenticated.

🔑 Implementing Login
The login page integrates with the backend to authenticate the user and store the JWT.

🏠 Dashboard Page
A dashboard where authenticated users can access their profile or account details.

🔄 Implementing Forgot Password
Integrates the forgot password process with the backend to allow users to reset their password.

Setup .env File
Create a .env file in the root directory and add the following variables:

MONGO_URI=your_mongo_uri
PORT=5000
JWT_SECRET=your_secret_key
NODE_ENV=development

MAILTRAP_TOKEN=your_mailtrap_token
MAILTRAP_ENDPOINT=https://send.api.mailtrap.io/

CLIENT_URL=http://localhost:5173
Run the App Locally

npm run build
Start the Backend
