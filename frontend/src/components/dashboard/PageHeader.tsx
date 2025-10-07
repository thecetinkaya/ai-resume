'use client';

import {
    Card,
    CardContent,
    Typography,
    Stack,
    Box,
} from '@mui/material';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, children }: PageHeaderProps) {
    return (
        <Card
            elevation={9}
            sx={{
                mb: 3,
                borderRadius: '12px',
                boxShadow: '0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
            }}
        >
            <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography
                            variant="h5"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: subtitle ? 1 : 0,
                            }}
                        >
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                    fontSize: '0.875rem',
                                }}
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                    {children && (
                        <Box>
                            {children}
                        </Box>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}