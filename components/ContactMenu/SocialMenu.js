'use client';

import React from 'react';
import IconAssests from '../svgAssests/IconAssests';
import classNames from 'classnames';
import style from './style.module.css';
import { useTheme } from 'next-themes';

const socialMenuList = [
    {
        key: 'github',
        iconName: 'GithubOutlineIcon',
        link: 'https://github.com/vishwakarmanikhil',
    },
    {
        key: 'linkedin',
        iconName: 'LinkedInOutlineIcon',
        link: 'https://www.linkedin.com/in/vishwakarmanikhil/',
    },
    {
        key: 'facebook',
        iconName: 'FacebookOutlineIcon',
        link: 'https://www.facebook.com/profile.php?id=100047871463007',
    },
    {
        key: 'instagram',
        iconName: 'InstagramOutlineIcon',
        link: 'https://www.instagram.com/nikhil_vishwakarma__/',
    },
];
 
const SocialMenu = (props) => {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === 'dark';

    const { source } = props;

    return (
        <div className={classNames(style.contact_menu__social, source === 'sideMenu' ? style.side_menu :  style.footer_menu, !isDarkMode ? style.cms__dark : '')}>
            <ul className={classNames(style.cms__list)}>
                {socialMenuList?.map((data, key) => {
                    const IconComponent = IconAssests[data?.iconName];
                    return (
                        <li key={`social-link-${key}`} className={classNames(style.cms__item)}>
                            <a href={data?.link} target='_blank' className={classNames(style.cms__link)}><IconComponent height='20' width='20' filledColor={!isDarkMode ? "#6b7280" : "#ccd6f6"} /></a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SocialMenu;