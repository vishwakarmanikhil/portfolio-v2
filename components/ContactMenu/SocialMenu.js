import React from 'react';
import IconAssests from '../svgAssests/IconAssests';

const socialMenuList = [
    {
        key: 'github',
        iconName: 'GithubOutlineIcon',
        link: '',
    },
    {
        key: 'linkedin',
        iconName: 'LinkedInOutlineIcon',
        link: '',
    },
    {
        key: 'facebook',
        iconName: 'FacebookOutlineIcon',
        link: '',
    },
    {
        key: 'instagram',
        iconName: 'InstagramOutlineIcon',
        link: '',
    },
];
 
const SocialMenu = () => {

    return (
        <div>
            <ul>
                {socialMenuList?.map((data, key) => {
                    return (
                        <li key={`social-link-${key}`}>
                            <a href={data?.link} target='_blank'><IconAssests.data?.iconName /></a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}