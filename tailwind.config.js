/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme';

module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    'Noto Sans SC', // google
                    'SimHei', // windows
                    'BiauKai', // mac
                    'STHeiti', // mac
                    ...defaultTheme.fontFamily.sans
                ],
                serif: [
                    'Noto Serif SC', // google
                    'STZhongsong', // office
                    'FangSong', // windows
                    'STSong', // mac
                    ...defaultTheme.fontFamily.serif
                ]
            },
            boxShadow: {
                custom: '0px 0px 8px 1px rgba(0,0,0,0.1)'
            }
        }
    },
    plugins: []
};
