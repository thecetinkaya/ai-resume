'use client';

import React, { useState } from 'react';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import {
    Menu as MenuIcon,
} from '@mui/icons-material';
import { DashboardSidebar } from './DashboardSidebar';
import { HeaderUserProfile } from './HeaderUserProfile';

const drawerWidth = 280;

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = <DashboardSidebar />;

    return (
        <Box sx={{ display: 'flex', width: '100%', overflowX: 'hidden' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                }}
            >
                <Toolbar sx={{
                    minHeight: '72px !important',
                    justifyContent: 'space-between',
                    px: { xs: 2, sm: 3 },
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: 2,
                                display: { sm: 'none' },
                                color: 'text.primary',
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    {/* Header User Profile */}
                    <HeaderUserProfile />
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            border: 'none',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` },
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    position: 'relative',
                }}
            >
                <Toolbar sx={{ minHeight: '72px !important' }} />
                <Box sx={{
                    backgroundColor: 'transparent',
                    borderRadius: 3,
                    minHeight: 'calc(100vh - 96px)',
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}