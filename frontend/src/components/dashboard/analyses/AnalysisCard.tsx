'use client';

import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Divider,
    Checkbox,
} from '@mui/material';
import {
    Download as DownloadIcon,
    Delete as DeleteIcon,
    TrendingUp as ScoreIcon,
    CheckCircle as SuccessIcon,
    Error as ErrorIcon,
    Lightbulb as SuggestionIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';

export interface Analysis {
    id: string;
    fileName: string;
    applicantName: string | null;
    matchScore: number | null;
    summary: string | null;
    errors: string[];
    suggestions: string[];
    strengths: string[];
    missingSections: string[];
    uploadDate: string;
    analysisStatus: string;
    extractedSkills: string | null;
}

interface AnalysisCardProps {
    analysis: Analysis;
    expanded: boolean;
    selected: boolean;
    deleting: boolean;
    onToggleExpand: () => void;
    onToggleSelect: () => void;
    onDelete: () => void;
}

export function AnalysisCard(props: AnalysisCardProps) {
    const { analysis, expanded, selected, deleting, onToggleExpand, onToggleSelect, onDelete } = props;

    const getScoreColor = (score: number): 'success' | 'warning' | 'error' => {
        if (score >= 80) return 'success';
        if (score >= 60) return 'warning';
        return 'error';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isProcessing = analysis.analysisStatus === 'PENDING' || analysis.analysisStatus === 'PROCESSING';

    const pulse = keyframes`
        0% { opacity: 0.2; }
        50% { opacity: 1; }
        100% { opacity: 0.2; }
    `;

    return (
        <Card sx={{
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 3,
            '&:hover': {
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 8px 25px rgba(0, 0, 0, 0.2)'
                    : '0 8px 25px rgba(0, 0, 0, 0.1)',
                borderColor: 'primary.main',
            },
            transition: 'all 0.3s ease-in-out',
            ...(expanded && {
                boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '0 12px 32px rgba(0, 0, 0, 0.3)'
                    : '0 12px 32px rgba(0, 0, 0, 0.15)',
                borderColor: 'primary.main',
            })
        }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" flexDirection={{ xs: 'row', sm: 'row' }} gap={1.5} alignItems={{ xs: 'center', sm: 'center' }}>
                    {/* Mobile layout */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, flex: 1, alignItems: 'center', gap: 1.25 }}>
                        <Checkbox checked={selected} onChange={onToggleSelect} sx={{ p: 0.5 }} />
                        <Avatar sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                            width: 36,
                            height: 36
                        }}>
                            {analysis.applicantName?.charAt(0) || 'CV'}
                        </Avatar>
                        <Box flex={1} minWidth={0}>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                sx={{
                                    color: 'text.primary',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {analysis.fileName}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {formatDate(analysis.uploadDate)}
                                {analysis.applicantName && ` • ${analysis.applicantName}`}
                                {isProcessing && ' • İşleniyor...'}
                            </Typography>
                            {/* Chips below on mobile */}
                            <Box display="flex" gap={1} sx={{ mt: 1 }}>
                                <Chip icon={<ScoreIcon />} label={`${analysis.matchScore || 0}`} color={getScoreColor(analysis.matchScore || 0)} size="small" />
                                <Chip label={`${analysis.errors?.length || 0} hata`} color="error" size="small" variant="outlined" sx={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#ef4444' }} />
                                <Chip label={`${analysis.strengths?.length || 0} güçlü`} color="success" size="small" variant="outlined" sx={{ borderColor: 'rgba(34, 197, 94, 0.5)', color: '#22c55e' }} />
                            </Box>
                        </Box>
                    </Box>

                    {/* Actions on right for mobile - vertically centered */}
                    <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton size="small" onClick={onToggleExpand} sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}>
                            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}>
                            <DownloadIcon />
                        </IconButton>
                        <IconButton size="small" onClick={onDelete} sx={{ color: 'error.main', '&:hover': { backgroundColor: 'error.lighter', color: '#ef4444' } }} disabled={deleting}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>

                    {/* Desktop layout (hidden on mobile) */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, flex: 1, alignItems: 'center', gap: 1.5 }}>
                        {/* Left: identity + meta */}
                        <Box flex={1} minWidth={0}>
                            <Box display="flex" alignItems="center" gap={1.25}>
                                <Checkbox checked={selected} onChange={onToggleSelect} sx={{ p: 0.5 }} />
                                <Avatar sx={{
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                    width: 40,
                                    height: 40
                                }}>
                                    {analysis.applicantName?.charAt(0) || 'CV'}
                                </Avatar>
                                <Box flex={1} minWidth={0}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        sx={{
                                            color: 'text.primary',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {analysis.fileName}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {formatDate(analysis.uploadDate)}
                                        {analysis.applicantName && ` • ${analysis.applicantName}`}
                                        {isProcessing && ' • İşleniyor...'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        {/* Center: chips in row */}
                        <Box display="flex" alignItems="center" gap={1} minWidth={300}>
                            <Chip icon={<ScoreIcon />} label={`${analysis.matchScore || 0}`} color={getScoreColor(analysis.matchScore || 0)} size="small" />
                            <Chip label={`${analysis.errors?.length || 0} hata`} color="error" size="small" variant="outlined" sx={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#ef4444' }} />
                            <Chip label={`${analysis.strengths?.length || 0} güçlü`} color="success" size="small" variant="outlined" sx={{ borderColor: 'rgba(34, 197, 94, 0.5)', color: '#22c55e' }} />
                        </Box>

                        {/* Right: actions in row */}
                        <Box display="flex" alignItems="center" gap={0.5}>
                            <IconButton size="small" onClick={onToggleExpand} sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}>
                                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { backgroundColor: 'action.hover', color: 'text.primary' } }}>
                                <DownloadIcon />
                            </IconButton>
                            <IconButton size="small" onClick={onDelete} sx={{ color: 'error.main', '&:hover': { backgroundColor: 'error.lighter', color: '#ef4444' } }} disabled={deleting}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </CardContent>

            {expanded && (
                <Box>
                    <Divider sx={{ borderColor: 'divider' }} />
                    <CardContent sx={{ pt: 3 }}>
                        {isProcessing ? (
                            <Box>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
                                    Analiz sürüyor...
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={1.5}>
                                    {['Metin çıkartılıyor', 'Özellikler ayrıştırılıyor', 'Güçlü yönler belirleniyor', 'Özet hazırlanıyor'].map((step, index) => (
                                        <Box key={index} display="flex" alignItems="center" gap={1}>
                                            <Box sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                                                animation: `${pulse} 1.5s ease-in-out ${index * 150}ms infinite`
                                            }} />
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{step}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        ) : analysis.summary && (
                            <Typography
                                variant="body1"
                                sx={{
                                    mb: 3,
                                    color: 'text.secondary',
                                }}
                            >
                                {analysis.summary}
                            </Typography>
                        )}

                        {!isProcessing && (
                            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <ErrorIcon sx={{ mr: 1, fontSize: 20, color: '#ef4444' }} />
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="bold"
                                            sx={{ color: 'text.primary' }}
                                        >
                                            Hatalar ({analysis.errors?.length || 0})
                                        </Typography>
                                    </Box>
                                    <List dense>
                                        {analysis.errors?.map((error, index) => (
                                            <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                                <ListItemText
                                                    primary={`• ${error}`}
                                                    primaryTypographyProps={{
                                                        variant: 'body2',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                        {(!analysis.errors || analysis.errors.length === 0) && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'success.main' }}
                                            >
                                                Hata bulunamadı ✓
                                            </Typography>
                                        )}
                                    </List>
                                </Box>

                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <SuggestionIcon sx={{ mr: 1, fontSize: 20, color: '#f59e0b' }} />
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="bold"
                                            sx={{ color: 'text.primary' }}
                                        >
                                            Öneriler ({analysis.suggestions?.length || 0})
                                        </Typography>
                                    </Box>
                                    <List dense>
                                        {analysis.suggestions?.map((suggestion, index) => (
                                            <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                                <ListItemText
                                                    primary={`• ${suggestion}`}
                                                    primaryTypographyProps={{
                                                        variant: 'body2',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                        {(!analysis.suggestions || analysis.suggestions.length === 0) && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.disabled' }}
                                            >
                                                Öneri bulunamadı
                                            </Typography>
                                        )}
                                    </List>
                                </Box>

                                <Box flex={1}>
                                    <Box display="flex" alignItems="center" mb={2}>
                                        <SuccessIcon sx={{ mr: 1, fontSize: 20, color: '#22c55e' }} />
                                        <Typography
                                            variant="subtitle2"
                                            fontWeight="bold"
                                            sx={{ color: 'text.primary' }}
                                        >
                                            Güçlü Yönler ({analysis.strengths?.length || 0})
                                        </Typography>
                                    </Box>
                                    <List dense>
                                        {analysis.strengths?.map((strength, index) => (
                                            <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                                                <ListItemText
                                                    primary={`• ${strength}`}
                                                    primaryTypographyProps={{
                                                        variant: 'body2',
                                                        color: 'text.secondary',
                                                    }}
                                                />
                                            </ListItem>
                                        ))}
                                        {(!analysis.strengths || analysis.strengths.length === 0) && (
                                            <Typography
                                                variant="body2"
                                                sx={{ color: 'text.disabled' }}
                                            >
                                                Güçlü yön bulunamadı
                                            </Typography>
                                        )}
                                    </List>
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Box>
            )}
        </Card>
    );
}

export default AnalysisCard;


