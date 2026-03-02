# Kodflix Login + Registration (REST API)

Tech stack used:
- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- Database: MySQL (Aiven)
- Auth: JWT in HTTP-only cookies
- Password hashing: bcrypt
- Architecture: MVC + REST APIs

## Project Structure

- `client/` React app (Login + Register pages in Netflix style)
- `server/` Express REST API with MVC pattern

## REST Endpoints

- `POST /api/auth/register`
  - Body:
    ```json
    {
      "name": "User",
      "email": "user@example.com",
      "password": "123456",
      "confirmPassword": "123456"
    }
    ```
  - Response: registration success message

- `POST /api/auth/login`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "123456"
    }
    ```
  - Response: success message + sets JWT in HTTP-only cookie `token`

## Environment Setup

### Backend (`server/.env`)

Copy `server/.env.example` to `server/.env` and keep/update values:


### Frontend (`client/.env`)

Copy `client/.env.example` to `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Run Instructions

1. Install backend dependencies:
   - `cd server`
   - `npm install`

2. Install frontend dependencies:
   - `cd ../client`
   - `npm install`

3. Start backend:
   - `cd ../server`
   - `npm run dev`

4. Start frontend:
   - `cd ../client`
   - `npm run dev`

5. Open:
   - `http://localhost:5173/login`

## Flow Implemented

1. User registers on `/register` page.
2. Frontend sends REST request to backend.
3. Backend hashes password using bcrypt and stores user in Aiven MySQL.
4. On success, frontend shows message and opens login page.
5. User logs in on `/login`.
6. Backend validates credentials and sets JWT in HTTP-only cookie.
7. Frontend redirects to:
   - `https://kodflix-flax.vercel.app/`

