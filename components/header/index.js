'use client';

import React, { useState, useEffect } from 'react';
import style from './style.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitch from '../themeComponent/ThemeSwitch';
import IconAssests from '../svgAssests/IconAssests';

const menuLink = [
    {name: 'About', link: 'about'},
    {name: 'Experience', link: 'experience'},
    {name: 'Work', link: 'work'},
    {name: 'Contact', link: 'contact'},
]

const Header = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        // When the drawer is open, set overflow to hidden
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            // When the drawer is closed, reset overflow
            document.body.style.overflow = '';
        }

        // Cleanup function to reset overflow when the component unmounts
        return () => {
            document.body.style.overflow = '';
        };
    }, [isDrawerOpen]); // Depend on isDrawerOpen

    const toggleDrawer = () => {
        // Drawer Toggle Handler
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xxl flex flex-wrap items-center justify-between mx-auto py-4 px-4 md:px-12">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image 
                            src="/logo.png" 
                            height={50} 
                            width={50} 
                            alt="Logo" 
                            className={classNames(style.logoImg)}
                            priority={false}
                        />
                    </Link>
                    <div className='flex'>
                        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse pl-5">
                            <div className='w-16'>
                                <ThemeSwitch />
                            </div>
                            <button onClick={toggleDrawer} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <IconAssests.HumbergMenuOutlineIcon height='20' width='20' filledColor={'#ccd6f6'} />
                            </button>
                        </div>
                        <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1 pr-5">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                {menuLink?.map((data, index) => {
                                    return (
                                        <li key={`desktop-menu-${index}`} data-aos="fade-down" data-aos-delay={`${index * 100}`}>
                                            <a href={`/#${data?.link}`} className="block py-2 px-3 md:p-0 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white rounded md:bg-transparent">{data?.name}</a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <aside id="default-sidebar" className={`fixed top-0 right-0 z-40 h-screen w-1/2 transition-transform ${!isDrawerOpen ? 'translate-x-full' : 'transform-none'}`} aria-label="Sidebar">
                <div className="h-full py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <button onClick={toggleDrawer} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                        <IconAssests.CloseFilledIcon height='20' width='20' filledColor={'#ccd6f6'} />
                        <span className="sr-only">Close menu</span>
                    </button>
                    <ul className="space-y-2 pt-10 font-medium">
                        {menuLink?.map((data, index) => {
                            return (
                                <li key={`mobile-menu-${index}`}>
                                    <a href={`/#${data?.link}`} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <span className="flex-1 ms-3 text-md text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white whitespace-nowrap">{data?.name}</span>
                                    </a>
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
            </aside>
        </header>
    );
};

export default Header;