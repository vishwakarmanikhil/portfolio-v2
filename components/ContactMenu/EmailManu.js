'use client';

import React from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

const EmailManu = () => {
    const { resolvedTheme } = useTheme();
    let isDarkMode = resolvedTheme === 'dark';

    return (
        <div className={classNames(style.contact_menu__email, !isDarkMode ? style.cme__dark : '')}>
            <div className={classNames(style.cme__division)}>
                <a href='mailto:vnikhil3101@gmail.com' className={classNames(style.cme__link_email)}>vnikhil3101@gmail.com</a>
            </div>
        </div>
    );
};

export default EmailManu;