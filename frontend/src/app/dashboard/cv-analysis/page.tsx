'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    LinearProgress,
    Alert,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Chip,
} from '@mui/material';
import {
    CloudUpload as UploadIcon,
    CheckCircle as CheckIcon,
    Description as FileIcon,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { keyframes } from '@emotion/react';

export default function CVAnalysisPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [analysisId, setAnalysisId] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type !== 'application/pdf') {
                setError('Lütfen sadece PDF dosyası yükleyin');
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                setError('Dosya boyutu 5MB\'dan küçük olmalıdır');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        
        setError('');

        try {
            const formData = new FormData();
            formData.append('cvFile', file);

            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3001/api/analyze-cv', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/';
                return;
            }

            if (response.ok) {
                const data = await response.json();
                const id = data.analysisId as string | undefined;
                
                if (id) {
                    setAnalysisId(id);
                    setProcessing(true);
                    setSuccess(false);
                } else {
                    setSuccess(true);
                    setTimeout(() => {
                        window.location.href = '/dashboard/my-analyses';
                    }, 1500);
                }
            } else {
                // HTML response kontrolü
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();
                    setError(data.message || 'Dosya yüklenirken hata oluştu');
                } else {
                    // HTML response - server error
                    setError(`Server hatası: ${response.status} - Backend sunucusunun çalıştığından emin olun`);
                }
        }
        } catch (error) {
            console.error('Upload error:', error);
            setError('Sunucuya bağlanırken hata oluştu. Backend sunucusunun localhost:3001\'de çalıştığından emin olun.');
        } finally {
            setUploading(false);
        }
    };

    // Poll analysis status when processing
    useEffect(() => {
        if (!processing || !analysisId) return;

        const poll = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:3001/api/analysis/${analysisId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    if (data.analysisStatus === 'COMPLETED') {
                        setProcessing(false);
                        setSuccess(true);
                        setTimeout(() => {
                            window.location.href = '/dashboard/my-analyses';
                        }, 1200);
                    } else if (data.analysisStatus === 'FAILED') {
                        setProcessing(false);
                        setError('Analiz başarısız oldu. Lütfen tekrar deneyin.');
                    }
                }
            } catch (e) {
                console.error('Status poll failed', e);
            }
        };

        const interval = setInterval(poll, 3000);
        return () => clearInterval(interval);
    }, [processing, analysisId]);

    // Animate steps while processing
    useEffect(() => {
        if (!processing) return;
        const stepInterval = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 4);
        }, 1200);
        return () => clearInterval(stepInterval);
    }, [processing]);

    const pulse = keyframes`
        0% { opacity: 0.25; }
        50% { opacity: 1; }
        100% { opacity: 0.25; }
    `;

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <DashboardLayout>
            <PageHeader
                title="CV Analizi 📄"
                subtitle="CV'nizi yükleyin ve AI destekli detaylı analiz raporu alın"
            />

            <Box>

                {/* Upload Area */}
                <Card sx={{ mb: 4 }}>
                    <CardContent sx={{ p: 4 }}>
                        <Box textAlign="center">
                            {!file ? (
                                <>
                                    <UploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>
                                        CV Dosyanızı Yükleyin
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                        PDF formatında, maksimum 5MB boyutunda dosya yükleyebilirsiniz
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={triggerFileInput}
                                        disabled={uploading}
                                    >
                                        Dosya Seç
                                    </Button>
                                </>
                            ) : (
                                <Box>
                                    <FileIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                                    <Typography variant="h6" gutterBottom>
                                        {file.name}
                                    </Typography>
                                    <Chip
                                        label={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                        color="primary"
                                        size="small"
                                        sx={{ mb: 3 }}
                                    />
                                    <Box>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={handleUpload}
                                            disabled={uploading}
                                            sx={{ mr: 2 }}
                                        >
                                            {uploading ? 'Analiz Ediliyor...' : 'Analiz Et'}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => setFile(null)}
                                            disabled={uploading}
                                        >
                                            Değiştir
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                            ref={fileInputRef}
                        />

                        {(uploading || processing) && (
                            <Box sx={{ mt: 3 }}>
                                <LinearProgress
                                    variant="indeterminate"
                                    sx={{ height: 8, borderRadius: 4 }}
                                />
                                <Typography variant="body2" textAlign="center" sx={{ mt: 1 }}>
                                    {processing ? 'Analiz devam ediyor, lütfen bekleyin...' : 'CV\'niz yükleniyor...'}
                                </Typography>
                                {processing && (
                                    <Box sx={{ mt: 2 }}>
                                        {['İçerik çıkartılıyor', 'Özellikler ayrıştırılıyor', 'Güçlü yönler belirleniyor', 'Özet hazırlanıyor'].map((step, idx) => (
                                            <Box key={idx} display="flex" alignItems="center" gap={1} sx={{ mb: 0.75 }}>
                                                <Box sx={{
                                                    width: 8,
                                                    height: 8,
                                                    borderRadius: '50%',
                                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                                    animation: `${pulse} 1.2s ease-in-out ${idx * 120}ms infinite`,
                                                    opacity: activeStep === idx ? 1 : 0.5
                                                }} />
                                                <Typography variant="body2" sx={{ color: activeStep === idx ? 'text.primary' : 'text.secondary' }}>{step}</Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        )}

                        {error && (
                            <Alert severity="error" sx={{ mt: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert
                                severity="success"
                                sx={{ mt: 3 }}
                                icon={<CheckIcon />}
                            >
                                CV başarıyla analiz edildi! Analizlerim sayfasına yönlendiriliyorsunuz...
                            </Alert>
                        )}
                    </CardContent>
                </Card>

                {/* Info Section */}
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            ℹ️ Analiz Hakkında
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="success" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Hata Tespiti"
                                    secondary="Tarih tutarsızlıkları, formatlamam sorunları tespit edilir"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="success" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="İyileştirme Önerileri"
                                    secondary="Detaylı öneriler ve eksik bölümler belirlenir"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon color="success" />
                                </ListItemIcon>
                                <ListItemText
                                    primary="AI Puanlaması"
                                    secondary="100 üzerinden profesyonel değerlendirme"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Box>
        </DashboardLayout>
    );
}