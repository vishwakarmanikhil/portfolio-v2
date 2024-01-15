import React from 'react';
import classNames from 'classnames';
import style from './style.module.css';

const Archive = () => {

    return (
        <section className={classNames(style.archive__page)}>
            <div className={classNames(style.archive__banner_wrap)}>
                <h1 className={classNames(style.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold mb-4')}>Archive</h1>
                <p className={classNames('text-lg tracking-wider font-regular text-sky-500 dark:text-sky-500')}>A big list of things I've worked on</p>
            </div>

            <div className={classNames(style.archive__project_wrap)}>
                <div className={classNames(style.archive__project)}>

                </div>
            </div>
        </section>
    )
}

export default Archive;