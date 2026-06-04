Login UI — Setup & Run
Frontend and backend are included in this workspace.

Backend (Express):

Change to the backend folder and install dependencies:
cd backend
npm install
npm start
This starts the server on http://localhost:3000 and serves the frontend static files.

Demo credentials:

Email: user@example.com
Password: Password123
Notes:

This is a minimal demo without a database. The backend accepts the demo credentials and returns a dummy token. The forgot-password endpoint always responds with a generic success message.
To change the port set the PORT environment variable before npm start.
