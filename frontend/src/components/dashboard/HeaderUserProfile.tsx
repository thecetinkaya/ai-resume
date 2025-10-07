'use client';

import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Badge,
} from '@mui/material';
import {
    AccountCircle as ProfileIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export function HeaderUserProfile() {
    const router = useRouter();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        router.push('/login');
        handleClose();
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton
                size="small"
                sx={{
                    color: 'text.secondary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        color: 'text.primary',
                    },
                }}
            >
                <Badge badgeContent={3} color="error">
                    <NotificationsIcon sx={{ fontSize: 20 }} />
                </Badge>
            </IconButton>

            {/* Dark Mode Toggle */}
            <IconButton
                size="small"
                onClick={toggleDarkMode}
                sx={{
                    color: 'text.secondary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                        color: 'text.primary',
                    },
                }}
            >
                {isDarkMode ?
                    <LightModeIcon sx={{ fontSize: 20 }} /> :
                    <DarkModeIcon sx={{ fontSize: 20 }} />
                }
            </IconButton>

            {/* User Profile Dropdown */}
            <Box
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    cursor: 'pointer',
                    py: 1,
                    px: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}
            >
                <Avatar sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    fontSize: '14px',
                    fontWeight: 600,
                }}>
                    {user?.name?.[0]?.toUpperCase() || <ProfileIcon sx={{ fontSize: 18 }} />}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 0 }}>
                    <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{
                            color: 'text.primary',
                            fontSize: '0.875rem',
                            lineHeight: 1.2,
                        }}
                        noWrap
                    >
                        {user?.name || 'Kullanıcı'}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            lineHeight: 1.2,
                        }}
                        noWrap
                    >
                        {user?.email || 'admin@example.com'}
                    </Typography>
                </Box>
                <ArrowDownIcon sx={{
                    fontSize: 16,
                    color: 'text.secondary',
                    transition: 'transform 0.2s ease',
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
            </Box>

            {/* Dropdown Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 7px 30px rgba(90, 114, 123, 0.11))',
                        mt: 1.5,
                        minWidth: 200,
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '12px',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            backgroundColor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRight: 0,
                            borderBottom: 0,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={{
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}>
                    <Avatar sx={{
                        mr: 2,
                        bgcolor: 'primary.main',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}>
                        {user?.name?.[0]?.toUpperCase() || <ProfileIcon />}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight="600">
                            {user?.name || 'Kullanıcı'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Hesap ayarları
                        </Typography>
                    </Box>
                </MenuItem>
                <MenuItem sx={{
                    color: 'text.primary',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                }}>
                    <SettingsIcon sx={{ mr: 2, fontSize: 20 }} />
                    Ayarlar
                </MenuItem>
                <Divider sx={{ borderColor: 'divider' }} />
                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.lighter',
                        },
                    }}
                >
                    <LogoutIcon sx={{ mr: 2, fontSize: 20 }} />
                    Çıkış Yap
                </MenuItem>
            </Menu>
        </Box>
    );
}