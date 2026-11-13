'use client';

import { useEffect, useState, Fragment } from "react";
import { usePathname } from "next/navigation";
import AOS from 'aos';
import 'aos/dist/aos.css';
import LogoAssets from "@/components/svgAssests/LogoAssets";
import Color from "@/constants/color";

// The page content is always rendered (so it is in the server HTML for search
// engines and AI crawlers); the preloader is a full-screen cover drawn on top
// of it for the first 2 seconds. Scroll animations start once the cover lifts.
export default function Loader({ children }) {
    const isAdmin = usePathname()?.startsWith('/admin') ?? false;
    const [loading, setLoading] = useState(!isAdmin)

    useEffect(() => {
        if (isAdmin) return;
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
            AOS.init({
                duration: 1000,
                once: true,
                offset: 0,
            });
        }, 2000);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = '';
        };
    }, [isAdmin])

    return (
        <Fragment>
            {children}
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-white dark:bg-gray-800" aria-hidden="true">
                    <div className="page__preloader">
                        <LogoAssets.LoaderLogoIcon height='150' width='150' filledColor={Color.primary} />
                    </div>
                    <p className="page__preloader_txt text-gray-300 dark:text-sky-900">Learning by Doing</p>
                </div>
            )}
        </Fragment>
    )
}
