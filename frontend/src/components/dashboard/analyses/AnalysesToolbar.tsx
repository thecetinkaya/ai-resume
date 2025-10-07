'use client';

import { Box, Button, Typography } from '@mui/material';

interface AnalysesToolbarProps {
    total: number;
    selectedCount: number;
    deleting: boolean;
    onDeleteSelected: () => void;
    onClearSelection: () => void;
}

export function AnalysesToolbar(props: AnalysesToolbarProps) {
    const { total, selectedCount, deleting, onDeleteSelected, onClearSelection } = props;
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {selectedCount > 0 ? `${selectedCount} analiz seçildi` : `${total} analiz`}
            </Typography>
            <Box display="flex" gap={1}>
                <Button
                    variant="outlined"
                    size="small"
                    disabled={selectedCount === 0 || deleting}
                    color="error"
                    onClick={onDeleteSelected}
                >
                    Seçili Analizleri Sil
                </Button>
                {selectedCount > 0 && (
                    <Button variant="text" size="small" onClick={onClearSelection} disabled={deleting}>
                        Seçimi Temizle
                    </Button>
                )}
            </Box>
        </Box>
    );
}

export default AnalysesToolbar;


