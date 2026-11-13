'use client';

import { useEffect } from 'react';

// Scrolls to the section named in the URL hash (e.g. /#work) after the page loader.
export default function HashScroll() {
    useEffect(() => {
        const anchor = window.location.hash.substring(1);
        const target = anchor && document.getElementById(anchor);
        if (!target) return;
        const timer = setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 1000);
        return () => clearTimeout(timer);
    }, []);
    return null;
}
