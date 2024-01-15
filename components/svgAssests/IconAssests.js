import React from 'react';

const MoonFilledIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="#A5B0C2"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M5 10C2.2385 10 0 7.7615 0 5C0 2.2385 2.2385 0 5 0C7.7615 0 10 2.2385 10 5C10 7.7615 7.7615 10 5 10ZM4.75 4C4.94891 4 5.13968 3.92098 5.28033 3.78033C5.42098 3.63968 5.5 3.44891 5.5 3.25C5.5 3.05109 5.42098 2.86032 5.28033 2.71967C5.13968 2.57902 4.94891 2.5 4.75 2.5C4.55109 2.5 4.36032 2.57902 4.21967 2.71967C4.07902 2.86032 4 3.05109 4 3.25C4 3.44891 4.07902 3.63968 4.21967 3.78033C4.36032 3.92098 4.55109 4 4.75 4ZM7 5.5C7.13261 5.5 7.25979 5.44732 7.35355 5.35355C7.44732 5.25979 7.5 5.13261 7.5 5C7.5 4.86739 7.44732 4.74021 7.35355 4.64645C7.25979 4.55268 7.13261 4.5 7 4.5C6.86739 4.5 6.74021 4.55268 6.64645 4.64645C6.55268 4.74021 6.5 4.86739 6.5 5C6.5 5.13261 6.55268 5.25979 6.64645 5.35355C6.74021 5.44732 6.86739 5.5 7 5.5ZM3.75 7.5C4.08152 7.5 4.39946 7.3683 4.63388 7.13388C4.8683 6.89946 5 6.58152 5 6.25C5 5.91848 4.8683 5.60054 4.63388 5.36612C4.39946 5.1317 4.08152 5 3.75 5C3.41848 5 3.10054 5.1317 2.86612 5.36612C2.6317 5.60054 2.5 5.91848 2.5 6.25C2.5 6.58152 2.6317 6.89946 2.86612 7.13388C3.10054 7.3683 3.41848 7.5 3.75 7.5Z" fill="#D2D9E1"/>
        </svg>
    );
};

const HumbergMenuOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke={props?.filledColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
    );
};

const CloseFilledIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} fill={props?.filledColor} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    );
};

const LinkOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={props?.filledColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    );
};

const GithubOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={props?.filledColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    );
};

const FolderOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={props?.filledColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
    );
};

const InstagramOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={props?.filledColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    );
};

const LinkedInOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={props?.filledColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    );
};

const FacebookOutlineIcon = (props) => {
    return (
        <svg width={props?.width} height={props?.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke={props?.filledColor} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
    );
};

const IconAssests = {
    MoonFilledIcon,
    HumbergMenuOutlineIcon,
    CloseFilledIcon,
    LinkOutlineIcon,
    GithubOutlineIcon,
    FolderOutlineIcon,
    InstagramOutlineIcon,
    LinkedInOutlineIcon,
    FacebookOutlineIcon
}

export default IconAssests;