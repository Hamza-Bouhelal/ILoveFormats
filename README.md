# ILoveFormats - File Format Converter

ILoveFormats is a modern web application that allows users to convert files between different formats. The project consists of two main components: a React-based frontend and a Node.js backend API.

## Project Structure

The project is divided into two main directories:

- `converter-client/`: Frontend React application
- `converter-api/`: Backend Node.js API

## Features

- Modern, responsive user interface built with React and Tailwind CSS
- File format conversion capabilities
- Secure file handling and processing
- RESTful API architecture
- Docker support for easy deployment
- TypeScript for type safety
- Database integration with PostgreSQL

## Tech Stack

### Frontend (converter-client)

- React 18
- TypeScript
- Vite
- Tailwind CSS
- NextUI Components
- React Router
- Axios for API communication
- React Dropzone for file uploads
- Framer Motion for animations

### Backend (converter-api)

- Node.js
- Express.js
- TypeScript
- TypeORM for database operations
- PostgreSQL database
- JWT for authentication
- Docker support
- Jest for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager
- Docker and Docker Compose (for running the database)
- PostgreSQL (if running locally)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd ILoveFormats
```

2. Install dependencies for both client and API:

```bash
# Install client dependencies
cd converter-client
yarn install

# Install API dependencies
cd ../converter-api
yarn install
```

3. Set up the database:

```bash
cd converter-api
yarn start:db
```

4. Start the development servers:

For the API:

```bash
cd converter-api
yarn dev
```

For the client:

```bash
cd converter-client
yarn dev
```

## Development

- The client runs on `http://localhost:5173` by default
- The API runs on `http://localhost:3000` by default
- API documentation is available at `/api-docs` when running the server

## Building for Production

### Frontend

```bash
cd converter-client
yarn build
```

### Backend

```bash
cd converter-api
yarn build
```

## Docker Support

The project includes Docker configuration for both development and production environments. To run the entire stack using Docker:

```bash
cd converter-api
docker-compose up
```

## Testing

Run tests for the API:

```bash
cd converter-api
yarn test
```

## License

This project is licensed under the MIT License.
