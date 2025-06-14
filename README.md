# 🎬 C-Dex - Movie Rating Website

C-Dex is a comprehensive movie rating and discovery platform that allows users to search for movies, rate them, write reviews, and discover new films through a unique gacha system.

## ✨ Features

- **🔍 Movie Search & Discovery**: Browse and search through a curated collection of movies
- **⭐ Rating System**: Rate movies and read reviews from other users
- **📝 User Reviews**: Write detailed reviews for movies you've watched
- **🎲 Movie Gacha**: Discover random movies through our unique gacha system
- **👤 User Authentication**: Secure login and signup functionality
- **📱 Responsive Design**: Beautiful, modern UI built with Chakra UI
- **🎯 Filter & Sort**: Advanced filtering by genre, rating, and sorting options

## 🏗️ Architecture

C-Dex is built using a modern full-stack architecture:

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Chakra UI** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js & Express** - RESTful API server
- **MongoDB** - NoSQL database for users and reviews
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing support

### DevOps
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and load balancer

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Desktop installed
- Node.js 18+ (for local development)
- MongoDB (handled by Docker)

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd C-Dexx-Full
   ```

2. **Start the application**
   ```bash
   # For first time setup
   docker compose up --build
   
   # For subsequent runs
   docker compose up
   ```

3. **Access the application**
   - Frontend: http://localhost:5020
   - Backend API: http://localhost:5020/api

### Local Development Setup

#### Frontend Setup
```bash
cd reactfrontend
npm install
npm start
```
The frontend will be available at http://localhost:3000

#### Backend Setup
```bash
cd backend
npm install
npm start
```
The backend API will be available at http://localhost:4000

## 📡 API Endpoints

### User Management
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/login` - User login

### Reviews
- `POST /api/review` - Create a new review
- `GET /api/review?movie={movieName}` - Get reviews for a specific movie
- `DELETE /api/review/:id` - Delete a review

## 🎮 Usage

### User Authentication
1. Sign up for a new account or login with existing credentials
2. Navigate through the application using the responsive navbar

### Movie Discovery
- **Search**: Use the search bar to find specific movies
- **Browse**: Explore the movie collection with filtering options
- **Gacha**: Try the movie gacha feature for random movie recommendations

### Rating & Reviews
1. Click on any movie to view its details
2. Leave a rating (1-5 stars) and write a review
3. View reviews from other users

## 🐳 Docker Services

The application runs four main services:

- **Frontend**: React application (port 3000 internally)
- **Backend**: Express API server (port 4000 internally)
- **MongoDB**: Database service (port 27017 internally)
- **Nginx**: Reverse proxy (port 5020 externally)

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `REACT_APP_API_URL`: Frontend API endpoint configuration

### Docker Configuration
The application uses Docker Compose for orchestration with:
- Multi-stage builds for optimization
- Health checks for service reliability
- Volume mounts for development
- Network isolation for security

## 🎨 UI Components

C-Dex features a modern, responsive design with:
- **Landing Page**: Hero section with movie wallpaper
- **Movie Search**: Grid layout with filter/sort capabilities
- **Movie Details**: Comprehensive movie information and review system
- **User Authentication**: Clean login/signup forms
- **Navigation**: Responsive navbar with user context

## 🛠️ Development

### Project Structure
```
C-Dexx-Full/
├── reactfrontend/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── assets/         # Images and static files
│   │   └── styles/         # CSS and styling
├── backend/                # Express backend API
│   ├── collections/        # MongoDB models
│   ├── app.js             # Main server file
│   └── connection.js      # Database connection
├── docker-compose.yaml     # Docker orchestration
├── nginx.conf             # Nginx configuration
└── README.md              # Project documentation
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include logs and steps to reproduce

---

**Happy Movie Rating! 🍿**
