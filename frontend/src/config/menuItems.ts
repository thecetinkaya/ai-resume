import {
    Dashboard as DashboardIcon,
    CloudUpload as UploadIcon,
    Assessment as AnalysisIcon,
} from '@mui/icons-material';
import { ComponentType } from 'react';

export interface MenuItem {
    text: string;
    icon: ComponentType;
    path: string;
}

export const menuItems: MenuItem[] = [
    {
        text: 'Dashboard',
        icon: DashboardIcon,
        path: '/dashboard',
    },
    {
        text: 'CV Analiz',
        icon: UploadIcon,
        path: '/dashboard/cv-analysis',
    },
    {
        text: 'Analizlerim',
        icon: AnalysisIcon,
        path: '/dashboard/my-analyses',
    },
];