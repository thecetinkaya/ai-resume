"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/components/common/PageContainer";
import Logo from "@/components/common/Logo";
import AuthLogin from "@/components/features/auth/AuthLogin";

export default function LoginPage() {
    return (
        <PageContainer title="Login" description="AI Resume Analyzer Login Page">
            <Box
                sx={{
                    position: "relative",
                    "&:before": {
                        content: '""',
                        background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
                        backgroundSize: "400% 400%",
                        animation: "gradient 15s ease infinite",
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        opacity: "0.3",
                    },
                }}
            >
                <Grid
                    container
                    spacing={0}
                    justifyContent="center"
                    sx={{ height: "100vh" }}
                >
                    <Grid
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        size={{
                            xs: 12,
                            sm: 12,
                            lg: 4,
                            xl: 3
                        }}>
                        <Card
                            elevation={9}
                            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
                        >
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo />
                            </Box>
                            <AuthLogin
                                subtext={
                                    <Typography
                                        variant="subtitle1"
                                        textAlign="center"
                                        color="textSecondary"
                                        mb={1}
                                    >
                                        AI Destekli CV Analiz Sistemi
                                    </Typography>
                                }
                                subtitle={
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        justifyContent="center"
                                        mt={3}
                                    >
                                        <Typography
                                            color="textSecondary"
                                            variant="h6"
                                            fontWeight="500"
                                        >
                                            Hesabın yok mu?
                                        </Typography>
                                        <Typography
                                            component={Link}
                                            href="/register"
                                            fontWeight="500"
                                            sx={{
                                                textDecoration: "none",
                                                color: "primary.main",
                                            }}
                                        >
                                            Hemen kayıt ol
                                        </Typography>
                                    </Stack>
                                }
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}