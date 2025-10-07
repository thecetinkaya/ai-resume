'use client';

import {
    Box,
    Typography,
} from '@mui/material';
import {
    Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { NavigationMenu } from './NavigationMenu';
import { useTheme } from '@/contexts/ThemeContext';

export function DashboardSidebar() {
    const { theme } = useTheme();

    return (
        <Box
            sx={{
                height: '100%',
                backgroundColor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Logo/Header */}
            <Box sx={{
                p: 3,
                textAlign: 'center',
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}>
                <Box sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    mb: 2,
                    boxShadow: theme.shadows[3],
                }}>
                    <AnalyticsIcon sx={{
                        fontSize: 28,
                        color: 'white',
                    }} />
                </Box>
                <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{
                        color: 'text.primary',
                        fontSize: '1.125rem',
                    }}
                >
                    AI Resume
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                        mt: 0.5,
                    }}
                >
                    Analyzer
                </Typography>
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ flex: 1, pt: 2 }}>
                <NavigationMenu />
            </Box>
        </Box>
    );
}