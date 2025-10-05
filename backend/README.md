# AI Resume Backend

Backend API for the AI-powered CV analysis platform.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_resume"
JWT_SECRET="your-jwt-secret"
GEMINI_API_KEY="your-gemini-api-key"
```

3. Initialize database:
```bash
npx prisma db push
npx prisma generate
```

4. Start development server:
```bash
npm run dev
```

Server will run on `http://localhost:3001`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `GEMINI_API_KEY` | Google Gemini AI API key | ✅ |

## Database Schema

### User
- `id`: Unique identifier
- `email`: User email (unique)
- `password`: Hashed password
- `createdAt`: Registration date

### CvAnalysis
- `id`: Unique identifier
- `userId`: Foreign key to User
- `fileName`: Original CV file name
- `name`: Extracted name from CV
- `skills`: Extracted skills
- `score`: AI-generated score (0-100)
- `summary`: AI-generated summary
- `errors`: Array of detected errors
- `suggestions`: Array of improvement suggestions
- `strengths`: Array of identified strengths
- `missingSections`: Array of missing sections
- `createdAt`: Analysis date

## API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### CV Analysis Endpoints

#### Upload CV for Analysis
```http
POST /api/cv/upload
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data

{
  "cv": <pdf-file>
}
```

#### Get User's CV Analyses
```http
GET /api/cv/analyses
Authorization: Bearer <jwt-token>
```