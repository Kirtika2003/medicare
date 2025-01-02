# Medicare - A Doctor Appointment Booking System

Medicare simplifies the process of scheduling medical consultations through a well-integrated platform with robust features.

## Features

### Frontend
A user-friendly interface enabling patients to:
- Browse doctors
- Check availability
- Book appointments
- Secure login and profile management
- Search functionality by specialty,fees and time slots

### Admin Panel
A comprehensive dashboard for clinic or hospital administrators to:
- Manage doctor profiles
- Handle appointments and schedules
- Update schedules and manage cancellations
- Analyze performance using detailed analytics

### Doctor Panel
An intuitive and secure interface tailored for doctors, offering features to:
- Efficiently manage availability and schedules.
- View and organize upcoming appointments.
- Access detailed patient information with privacy safeguards.
- Update appointment statuses seamlessly.

### Backend
The backend ensures seamless data storage, secure appointment scheduling, and user authentication. It leverages modern technologies to deliver robust functionality:

- **Cloudinary**: Efficient cloud storage for managing images.
- **bcryptjs**: Password hashing for secure user authentication.
- **Express**: Fast, unopinionated framework for building the RESTful API.
- **CORS**: Enables secure cross-origin resource sharing.
- **Dotenv**: Manages environment variables securely.
- **JSON Web Tokens (JWT)**: Provides secure authentication mechanisms.
- **Mongoose**: Simplifies interactions with the MongoDB database.
- **Multer**: Handles file uploads efficiently.
- **Razorpay**: Integrates secure and reliable payment processing.
- **Validator**: Ensures input validation for secure data handling.
- **Nodemon**: Simplifies development by monitoring changes and restarting the server automatically.

## Installation

### Prerequisites
- Node.js and npm
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   ```
2. Navigate to the project directory:
   ```bash
   cd medicare
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the necessary keys (e.g., database URI, JWT secret, Razorpay keys, Cloudinary credentials).
5. Start the development servers:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```

## Deployment
To deploy the application, ensure the environment variables are configured on the server. Use tools like Render, Heroku, or AWS for hosting the backend and a CDN for the frontend.

## Technologies Used

### Frontend
- React.js
- CSS/SCSS

### Backend
- Node.js
- Express.js
- MongoDB
- Razorpay

### Additional Libraries
- Cloudinary
- bcryptjs
- JSON Web Tokens (JWT)
- Multer
- Validator
- CORS

## Contributions
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries or support, contact:
- Email: priyadarshinikirtika2003@gmail.com
- GitHub: (https://github.com/Kirtika2003)

