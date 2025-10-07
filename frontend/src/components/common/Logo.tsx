'use client';

import { Box, Typography } from '@mui/material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';
import { useTheme } from '@/contexts/ThemeContext';

export default function Logo() {
    const { theme } = useTheme();

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
        }}>
            <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                mr: 2,
                boxShadow: theme.shadows[3],
            }}>
                <AnalyticsIcon sx={{
                    fontSize: 28,
                    color: 'white',
                }} />
            </Box>
            <Box>
                <Typography
                    variant="h5"
                    fontWeight="700"
                    sx={{
                        color: 'text.primary',
                        fontSize: '1.5rem',
                    }}
                >
                    AI Resume
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        lineHeight: 1,
                    }}
                >
                    Analyzer
                </Typography>
            </Box>
        </Box>
    );
}