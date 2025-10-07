'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { Analysis } from '@/components/dashboard/analyses/AnalysisCard';
import AnalysisCard from '@/components/dashboard/analyses/AnalysisCard';
import AnalysesToolbar from '@/components/dashboard/analyses/AnalysesToolbar';
import EmptyAnalyses from '@/components/dashboard/analyses/EmptyAnalyses';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Using Analysis type from component

export default function MyAnalysesPage() {
    const router = useRouter();
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState<boolean>(false);

    useEffect(() => {
        fetchAnalyses();
    }, []);

    // Polling while any item is processing
    useEffect(() => {
        const anyProcessing = analyses.some(a => a.analysisStatus === 'PENDING' || a.analysisStatus === 'PROCESSING');
        if (!anyProcessing) return;

        const interval = setInterval(() => {
            fetchAnalyses();
        }, 3000);

        return () => clearInterval(interval);
    }, [analyses]);

    const fetchAnalyses = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/my-analyses', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                router.push('/');
                return;
            }
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched analyses data:', data);
                console.log('First analysis errors:', data[0]?.errors);
                setAnalyses(data);
            } else {
                console.error('API response not ok:', response.status);
            }
        } catch (error) {
            console.error('Error fetching analyses:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const clearSelection = () => setSelectedIds(new Set());

    const deleteSingle = async (id: string) => {
        const confirmed = window.confirm('Bu analizi silmek istediğinize emin misiniz?');
        if (!confirmed) return;
        try {
            setDeleting(true);
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:3001/api/analysis/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (res.status === 401) {
                localStorage.removeItem('token');
                router.push('/');
                return;
            }
            if (res.status === 204) {
                setAnalyses(prev => prev.filter(a => a.id !== id));
                setSelectedIds(prev => {
                    const next = new Set(prev);
                    next.delete(id);
                    return next;
                });
            } else {
                console.error('Delete failed with status', res.status);
            }
        } catch (e) {
            console.error('Single delete error', e);
        } finally {
            setDeleting(false);
        }
    };

    const deleteSelected = async () => {
        if (selectedIds.size === 0) return;
        const confirmed = window.confirm(`${selectedIds.size} analizi silmek istediğinize emin misiniz?`);
        if (!confirmed) return;
        try {
            setDeleting(true);
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:3001/api/my-analyses', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: Array.from(selectedIds) })
            });
            if (res.status === 401) {
                localStorage.removeItem('token');
                router.push('/');
                return;
            }
            if (res.ok) {
                const { deletedCount } = await res.json();
                if (typeof deletedCount === 'number') {
                    setAnalyses(prev => prev.filter(a => !selectedIds.has(a.id)));
                    clearSelection();
                }
            } else {
                console.error('Bulk delete failed with status', res.status);
            }
        } catch (e) {
            console.error('Bulk delete error', e);
        } finally {
            setDeleting(false);
        }
    };

    // Presentation helpers moved into AnalysisCard

    if (loading) {
        return (
            <DashboardLayout>
                <Box textAlign="center" py={8}>
                    <LinearProgress sx={{
                        mb: 2,
                        maxWidth: 400,
                        mx: 'auto',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        },
                    }} />
                    <Typography sx={{ color: 'text.secondary' }}>
                        Analizler yükleniyor...
                    </Typography>
                </Box>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <PageHeader
                title="Analizlerim 📊"
                subtitle="Geçmiş CV analizlerinizi inceleyin ve ilerlemeniyi takip edin"
            >
                <Button
                    variant="contained"
                    href="/dashboard/cv-analysis"
                    size="large"
                    sx={{
                        borderRadius: '8px',
                        fontWeight: 600,
                        px: 3,
                    }}
                >
                    Yeni Analiz
                </Button>
            </PageHeader>

            <Box>
                {analyses.length === 0 ? (
                    <EmptyAnalyses />
                ) : (
                    <Box display="flex" flexDirection="column" gap={2}>
                        <AnalysesToolbar
                            total={analyses.length}
                            selectedCount={selectedIds.size}
                            deleting={deleting}
                            onDeleteSelected={deleteSelected}
                            onClearSelection={clearSelection}
                        />
                        {analyses.map((analysis) => (
                            <AnalysisCard
                                key={analysis.id}
                                analysis={analysis}
                                expanded={expandedCard === analysis.id}
                                selected={selectedIds.has(analysis.id)}
                                deleting={deleting}
                                onToggleExpand={() => setExpandedCard(expandedCard === analysis.id ? null : analysis.id)}
                                onToggleSelect={() => toggleSelect(analysis.id)}
                                onDelete={() => deleteSingle(analysis.id)}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        </DashboardLayout>
    );
}