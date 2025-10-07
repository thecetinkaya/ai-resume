'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { config } from '@/config/api';

interface AuthRegisterProps {
    subtext?: React.ReactNode;
    subtitle?: React.ReactNode;
}

export default function AuthRegister({ subtext, subtitle }: AuthRegisterProps) {
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
                // Token ve kullanıcı bilgilerini localStorage'a kaydet
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

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
                    sx={{ mt: 2, py: 1.5 }}
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
            </Box>

            {subtitle}
        </Box>
    );
}