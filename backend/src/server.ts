// server.ts veya app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import prisma from './config/prismaClient';
import { analyzeCvInBackground } from './services/ai-processor';
import userRouter from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import { authenticate } from './middleware/auth.middleware';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' }); // CV'lerin geçici olarak kaydedileceği klasör

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRoutes);

// Interface for authenticated request
interface AuthRequest extends express.Request {
    userId?: string;
}

// POST /api/analyze-cv endpoint'i (Auth required)
app.post('/api/analyze-cv', authenticate, upload.single('cvFile'), async (req: AuthRequest, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'Lütfen bir CV dosyası yükleyin.' });
    }

    const filePath = req.file.path;
    const fileName = req.file.originalname;

    // 1. Veritabanında Kayıt Oluşturma (Durum: PENDING)
    try {
        const newAnalysis = await prisma.cvAnalysis.create({
            data: {
                userId: parseInt(req.userId!), // Authenticated user'ın ID'si
                fileName: fileName,
                analysisStatus: 'PENDING',
            },
        });

        // 2. AI İşlemini Asenkron Olarak Başlatma
        analyzeCvInBackground(newAnalysis.id, filePath);

        res.status(202).send({
            message: 'CV yükleme başarılı. Analiz başlatıldı.',
            analysisId: newAnalysis.id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Veritabanı kaydı oluşturulamadı.' });
    }
});

// GET /api/analysis/:id (Auth required)
app.get('/api/analysis/:id', authenticate, async (req: AuthRequest, res) => {
    const analysisId = req.params.id;

    try {
        const analysis = await prisma.cvAnalysis.findUnique({
            where: {
                id: analysisId,
                userId: parseInt(req.userId!) // Sadece kendi analizlerini görebilir
            },
            select: {
                analysisStatus: true,
                applicantName: true,
                matchScore: true,
                summary: true,
                extractedSkills: true,
                uploadDate: true,
                fileName: true,
            }
        });

        if (!analysis) {
            return res.status(404).send({ message: 'Analiz bulunamadı.' });
        }

        res.status(200).json(analysis);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Veritabanı hatası.' });
    }
});

// GET /api/my-analyses - Kullanıcının tüm analizlerini getir
app.get('/api/my-analyses', authenticate, async (req: AuthRequest, res) => {
    try {
        const analyses = await prisma.cvAnalysis.findMany({
            where: { userId: parseInt(req.userId!) },
            select: {
                id: true,
                fileName: true,
                uploadDate: true,
                analysisStatus: true,
                matchScore: true,
                applicantName: true,
            },
            orderBy: { uploadDate: 'desc' }
        });

        res.status(200).json(analyses);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Analizler getirilemedi.' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));