'use client';

import {
    Box,
    Typography,
    Avatar,
    Button,
    IconButton,
} from '@mui/material';
import {
    Logout as LogoutIcon,
    AccountCircle as ProfileIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export function UserProfile() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/auth/login');
    };

    return (
        <Box sx={{ p: 3 }}>
            {/* User Info */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
                <Avatar sx={{
                    mr: 2,
                    width: 40,
                    height: 40,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                }}>
                    <ProfileIcon sx={{ fontSize: 20 }} />
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                        variant="subtitle2"
                        fontWeight="600"
                        sx={{
                            color: 'white',
                            fontSize: '0.875rem',
                            lineHeight: 1.2,
                        }}
                        noWrap
                    >
                        Kullanıcı
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.75rem',
                            lineHeight: 1.2,
                        }}
                        noWrap
                    >
                        user@example.com
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    <SettingsIcon sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>

            {/* Logout Button */}
            <Button
                fullWidth
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: 'rgba(239, 68, 68, 0.5)',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        color: '#ef4444',
                    },
                    transition: 'all 0.2s ease-in-out',
                }}
            >
                Çıkış Yap
            </Button>
        </Box>
    );
}