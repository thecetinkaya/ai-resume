'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Light Theme - Modernize Style
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5D87FF',
            dark: '#4570EA',
            light: '#ECF2FF',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#49BEFF',
            dark: '#23afdb',
            light: '#E8F7FF',
        },
        success: {
            main: '#13DEB9',
            light: '#E6FFFA',
            dark: '#02b3a9',
            contrastText: '#ffffff',
        },
        info: {
            main: '#539BFF',
            light: '#EBF3FE',
            dark: '#1682d4',
            contrastText: '#ffffff',
        },
        error: {
            main: '#FA896B',
            light: '#FDEDE8',
            dark: '#f3704d',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#FFAE1F',
            light: '#FEF5E5',
            dark: '#ae8e59',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f5f5f9',
            paper: '#ffffff',
        },
        text: {
            primary: '#2A3547',
            secondary: '#5A6A85',
        },
        grey: {
            50: '#F9FAFC',
            100: '#F3F6F9',
            200: '#E5EAF2',
            300: '#D7E3F0',
            400: '#C8D9E8',
            500: '#B1C2DE',
            600: '#9FB3D3',
            700: '#7C8FAC',
            800: '#5A6A85',
            900: '#2A3547',
        },
        divider: 'rgba(90, 106, 133, 0.12)',
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.75rem',
            lineHeight: 1.6,
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    border: '0px solid rgba(90, 106, 133, 0.11)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    padding: '8px 22px',
                },
                contained: {
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    '&:hover': {
                        boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.3)',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    border: 'none',
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    border: '0px solid rgba(90, 106, 133, 0.11)',
                },
            },
        },
    },
});

// Dark Theme - Modernize Style
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#5D87FF',
            dark: '#4570EA',
            light: '#ECF2FF',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#49BEFF',
            dark: '#23afdb',
            light: '#E8F7FF',
        },
        success: {
            main: '#13DEB9',
            light: '#E6FFFA',
            dark: '#02b3a9',
            contrastText: '#ffffff',
        },
        info: {
            main: '#539BFF',
            light: '#EBF3FE',
            dark: '#1682d4',
            contrastText: '#ffffff',
        },
        error: {
            main: '#FA896B',
            light: '#FDEDE8',
            dark: '#f3704d',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#FFAE1F',
            light: '#FEF5E5',
            dark: '#ae8e59',
            contrastText: '#ffffff',
        },
        background: {
            default: '#2A3547',
            paper: '#2A3547',
        },
        text: {
            primary: '#EAEFF4',
            secondary: '#7C8FAC',
        },
        grey: {
            50: '#F9FAFC',
            100: '#F3F6F9',
            200: '#E5EAF2',
            300: '#D7E3F0',
            400: '#C8D9E8',
            500: '#B1C2DE',
            600: '#9FB3D3',
            700: '#7C8FAC',
            800: '#5A6A85',
            900: '#2A3547',
        },
        divider: 'rgba(124, 143, 172, 0.15)',
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", sans-serif',
        h1: {
            fontWeight: 600,
            fontSize: '2.25rem',
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 600,
            fontSize: '1.875rem',
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 600,
            fontSize: '1.5rem',
            lineHeight: 1.4,
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: 1.4,
        },
        h5: {
            fontWeight: 600,
            fontSize: '1.125rem',
            lineHeight: 1.5,
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.75rem',
            lineHeight: 1.6,
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 500,
        },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2A3547',
                    borderRadius: '12px',
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    border: '0px solid rgba(124, 143, 172, 0.15)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    padding: '8px 22px',
                },
                contained: {
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    '&:hover': {
                        boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.3)',
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#2A3547',
                    border: 'none',
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2A3547',
                    boxShadow: '0px 7px 30px 0px rgba(90, 114, 123, 0.11)',
                    border: '0px solid rgba(124, 143, 172, 0.15)',
                },
            },
        },
    },
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

    useEffect(() => {
        // Load theme preference from localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('theme', newMode ? 'dark' : 'light');
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}