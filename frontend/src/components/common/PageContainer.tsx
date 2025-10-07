'use client';

import { Container, Box } from '@mui/material';

interface PageContainerProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function PageContainer({ title, description, children }: PageContainerProps) {
    return (
        <Container
            maxWidth={false}
            sx={{
                padding: 0,
                margin: 0,
                width: '100%',
                height: '100vh',
            }}
        >
            <title>{title}</title>
            <meta name="description" content={description} />
            <Box sx={{ width: '100%', height: '100%' }}>
                {children}
            </Box>
        </Container>
    );
}