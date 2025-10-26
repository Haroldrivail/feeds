import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            return savedTheme;
        }
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDark) {
            return 'dark';
        }

        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;



        // Remove both classes first
        root.classList.remove('light', 'dark');

        // Add the current theme class
        root.classList.add(theme);



        // Save to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';

            return newTheme;
        });
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
