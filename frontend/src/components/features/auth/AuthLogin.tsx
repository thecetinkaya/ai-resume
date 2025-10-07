'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { config } from '@/config/api';

interface AuthLoginProps {
    subtext?: React.ReactNode;
    subtitle?: React.ReactNode;
}

export default function AuthLogin({ subtext, subtitle }: AuthLoginProps) {
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
            const response = await fetch(`${config.apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Token ve kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

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
        <Box>
            {subtext}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    mt: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
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
                    sx={{ mt: 2, py: 1.5 }}
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
            </Box>

            {subtitle}
        </Box>
    );
}