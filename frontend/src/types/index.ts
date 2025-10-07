// Common TypeScript types
export interface Analysis {
    id: string;
    fileName: string;
    applicantName: string | null;
    matchScore: number | null;
    summary: string | null;
    errors: string[];
    suggestions: string[];
    strengths: string[];
    missingSections: string[];
    uploadDate: string;
    analysisStatus: string;
    extractedSkills: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface DashboardStats {
    totalCount: number;
    averageScore: number | null;
    lastAnalysisDate: string | null;
}