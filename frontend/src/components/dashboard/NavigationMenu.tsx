'use client';

import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { menuItems } from '@/config/menuItems';

export function NavigationMenu() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <List sx={{ px: 2, py: 1 }}>
            {menuItems.map((item) => {
                const IconComponent = item.icon;
                const isSelected = pathname === item.path;

                return (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={isSelected}
                            onClick={() => router.push(item.path)}
                            sx={{
                                borderRadius: '8px',
                                px: 2,
                                py: 1.25,
                                minHeight: 44,
                                color: isSelected
                                    ? 'primary.main'
                                    : 'text.secondary',
                                backgroundColor: isSelected
                                    ? 'primary.light'
                                    : 'transparent',
                                position: 'relative',
                                transition: 'all 0.2s ease-in-out',

                                '&:hover': {
                                    backgroundColor: isSelected
                                        ? 'primary.light'
                                        : 'action.hover',
                                    color: isSelected
                                        ? 'primary.main'
                                        : 'text.primary',
                                    transform: 'translateX(4px)',

                                    '& .MuiListItemIcon-root': {
                                        color: isSelected
                                            ? 'primary.main'
                                            : 'text.primary',
                                    },
                                },

                                '& .MuiListItemIcon-root': {
                                    color: isSelected
                                        ? 'primary.main'
                                        : 'text.secondary',
                                    minWidth: 36,
                                    transition: 'all 0.2s ease-in-out',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <IconComponent />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: isSelected ? 600 : 500,
                                    fontSize: '14px',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}