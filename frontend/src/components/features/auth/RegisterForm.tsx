'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link as MuiLink, Alert, CircularProgress } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { config } from '@/config/api';

export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Şifre eşleşme kontrolü
        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${config.apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (response.ok) {
                // Token'ı localStorage'a kaydet
                localStorage.setItem('token', data.token);

                // Başarılı kayıt - dashboard'a yönlendir
                router.push('/dashboard');
            } else {
                // Hata mesajını göster
                setError(data.message || 'Kayıt olurken hata oluştu');
            }
        } catch (error) {
            console.error('Register error:', error);
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
                width: { xs: '90%', sm: '400px' },
                padding: 4,
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Hesap Oluştur
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                label="Ad Soyad"
                type="text"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
            />

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
                helperText="En az 6 karakter olmalıdır"
            />

            <TextField
                label="Şifre Tekrar"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                error={password !== confirmPassword && confirmPassword.length > 0}
                helperText={password !== confirmPassword && confirmPassword.length > 0 ? 'Şifreler eşleşmiyor' : ''}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ mt: 1 }}
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Hesap Oluşturuluyor...
                    </>
                ) : (
                    'Hesap Oluştur'
                )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
                <NextLink href="/auth/login" passHref legacyBehavior>
                    <MuiLink variant="body2" underline="hover">
                        Zaten hesabın var mı? Giriş Yap
                    </MuiLink>
                </NextLink>
            </Box>
        </Box>
    );
}
