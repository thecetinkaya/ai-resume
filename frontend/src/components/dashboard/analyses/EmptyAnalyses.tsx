'use client';

import { Card, CardContent, Typography, Button } from '@mui/material';

export function EmptyAnalyses() {
    return (
        <Card sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
        }}>
            <CardContent sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: 'text.primary', fontWeight: 600 }}
                >
                    Henüz analiz yapılmamış
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mb: 3 }}
                >
                    İlk CV analizinizi yapmak için aşağıdaki butona tıklayın
                </Typography>
                <Button
                    variant="contained"
                    href="/dashboard/cv-analysis"
                    sx={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    }}
                >
                    İlk Analizimi Yap
                </Button>
            </CardContent>
        </Card>
    );
}

export default EmptyAnalyses;


