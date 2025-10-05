# AI Resume Analyzer

🤖 **AI-powered CV analysis platform** that helps users improve their resumes with comprehensive feedback and error detection.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **CV Upload & Analysis**: Upload PDF CVs for AI-powered analysis
- **Error Detection**: Comprehensive error detection including formatting, chronology, and content issues
- **Improvement Suggestions**: Detailed suggestions for CV enhancement
- **Strengths Analysis**: Identifies and highlights CV strengths
- **Missing Sections Detection**: Points out missing important sections
- **AI-Powered Scoring**: Get an overall CV score out of 100

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma ORM** with **PostgreSQL** database
- **Google Gemini AI** for CV analysis
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for file uploads
- **pdf-parse** for PDF text extraction

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/thecetinkaya/ai-resume.git
cd ai-resume
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Add your environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ai_resume"
JWT_SECRET="your-jwt-secret"
GEMINI_API_KEY="your-gemini-api-key"
```

4. Set up the database:
```bash
npx prisma db push
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### CV Analysis
- `POST /api/cv/upload` - Upload and analyze CV (requires authentication)
- `GET /api/cv/analyses` - Get user's CV analyses (requires authentication)

## 📊 Analysis Features

The AI analyzer provides:

- **Name & Skills Extraction**: Automatically extracts user information
- **Overall Score**: 0-100 scoring system
- **Error Detection**: 
  - Future date errors
  - Chronology issues
  - Formatting problems
  - Content inconsistencies
- **Improvement Suggestions**: Actionable recommendations
- **Strengths Identification**: Highlights positive aspects
- **Missing Sections**: Identifies important missing information

## 🏗️ Project Structure

```
ai-resume/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Authentication middleware
│   │   ├── utils/           # Utility functions
│   │   ├── config/          # Database configuration
│   │   └── server.ts        # Express server setup
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Developed by **Burak Çetinkaya**

---

⭐ If you find this project helpful, please give it a star!