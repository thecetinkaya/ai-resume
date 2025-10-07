// app/page.tsx

import { Box, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

// Ana Sayfa içeriği
export default function HomePage() {
  return (
    // MUI Container bileşeni, içeriği merkeze hizalar ve max genişlik verir.
    <Container
      component="main"
      maxWidth="md" // Orta boyutta bir max genişlik
      sx={{
        textAlign: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        minHeight: '80vh', // Sayfanın en az görünüm yüksekliğini kaplamasını sağlar
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      {/* 1. Başlık ve Açıklama */}
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        Mükemmel Frontend Mimarisiyle Tanışın
      </Typography>

      <Typography
        variant="h5"
        color="text.secondary"
        paragraph
        sx={{ mb: 4 }}
      >
        Next.js, MUI ve Temiz Mimari prensipleriyle oluşturulmuş modern ve ölçeklenebilir bir uygulama çatısı. Başlamak için giriş yapın veya kayıt olun.
      </Typography>

      {/* 2. Aksiyon Butonları */}
      <Box
        sx={{
          display: 'flex',
          gap: 2, // Butonlar arası boşluk
          flexDirection: { xs: 'column', sm: 'row' } // Küçük ekranlarda alt alta, büyük ekranlarda yan yana
        }}
      >
        <Button
          component={Link}
          href="/login"
          variant="contained"
          color="primary"
          size="large"
          sx={{ minWidth: 200 }}
        >
          Giriş Yap
        </Button>

        <Button
          component={Link}
          href="/register"
          variant="outlined"
          color="secondary"
          size="large"
          sx={{ minWidth: 200 }}
        >
          Hemen Kaydol
        </Button>
      </Box>

    </Container>
  );
}