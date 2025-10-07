'use client';
// Dosyanın başına eklerseniz theme function'ları kullanabilirsiniz

import { LoginForm } from '@/components/features/auth/LoginForm';
import { Container } from '@mui/material';

export default function LoginPage() {
    return (
        // Container, formu merkezler ve max-width uygular.
        <Container
            component="main"
            maxWidth={false} // Container'ın max-width'ini kaldırmak için
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // İsteğe bağlı: Arka plan rengi veya görseli eklenebilir
                backgroundColor: (theme) => theme.palette.grey[50],
            }}
        >
            <LoginForm />
        </Container>
    );
}