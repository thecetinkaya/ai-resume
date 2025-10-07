// src/components/features/Auth/LoginForm.tsx
'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink, Alert, CircularProgress } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Token'ı localStorage'a kaydet
                localStorage.setItem('token', data.token);

                // Başarılı giriş - dashboard'a yönlendir
                router.push('/dashboard');
            } else {
                // Hata mesajını göster
                setError(data.message || 'Giriş yapılırken hata oluştu');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Sunucuya bağlanırken hata oluştu. Lütfen tekrar deneyin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: { xs: '90%', sm: '400px' }, // Farklı ekran boyutlarında genişlik ayarı
                padding: 4,
                boxShadow: 3, // MUI'dan gelen gölge (elevation)
                borderRadius: 2,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // Bileşenler arası boşluk
            }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Hesabına Giriş Yap
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                label="E-posta Adresi"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />

            <TextField
                label="Şifre"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 1 }} // Margin-top ekle
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Giriş Yapılıyor...
                    </>
                ) : (
                    'Giriş Yap'
                )}
            </Button>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <NextLink href="/forgot-password" passHref legacyBehavior>
                    <MuiLink variant="body2" underline="hover">
                        Şifremi Unuttum
                    </MuiLink>
                </NextLink>
                <NextLink href="/register" passHref legacyBehavior>
                    <MuiLink variant="body2" underline="hover">
                        Hesabın yok mu? Kayıt Ol
                    </MuiLink>
                </NextLink>
            </Box>
        </Box>
    );
}