'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { config } from '@/config/api';

export default function DashboardPage() {
    const router = useRouter();
    const [stats, setStats] = useState<{ totalCount: number; averageScore: number | null; lastAnalysisDate: string | null } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${config.apiUrl}/api/my-analyses/stats`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    router.push('/');
                    return;
                }
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (e) {
                console.error('Stats fetch failed', e);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <DashboardLayout>
            <PageHeader
                title="Hoş Geldiniz! 👋"
                subtitle="AI destekli CV analiz sistemi ile kariyerinizi geliştirin"
            />

            <Box>

                <Grid container spacing={3}>
                    {/* Quick Actions */}
                    <Grid>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    🚀 Hızlı İşlemler
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    CV nizi analiz edin ve detaylı rapor alın
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    onClick={() => router.push('/dashboard/cv-analysis')}
                                    sx={{ mb: 2 }}
                                >
                                    Yeni CV Analizi
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    onClick={() => router.push('/dashboard/my-analyses')}
                                >
                                    Analizlerimi Görüntüle
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Stats */}
                    <Grid>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    📊 İstatistikler
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body2">Toplam Analiz:</Typography>
                                        <Typography variant="body2" fontWeight="bold">{loading ? '-' : (stats?.totalCount ?? 0)}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Typography variant="body2">Ortalama Puan:</Typography>
                                        <Typography variant="body2" fontWeight="bold">{loading ? '-' : (stats?.averageScore != null ? Math.round(stats.averageScore) : '-')}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2">Son Analiz:</Typography>
                                        <Typography variant="body2" fontWeight="bold">{loading ? '-' : (stats?.lastAnalysisDate ? new Date(stats.lastAnalysisDate).toLocaleString() : '-')}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </DashboardLayout>
    );
}