import classNames from 'classnames';
import styles from './style.module.css';
import Image from 'next/image';

const AboutMe = () => {

    return (
        <div className={classNames(styles.about__container)}>
          <div className={classNames(styles.about__left_wrap)}>
            <div>
              <p className={classNames('text-md font-medium text-gray-500 dark:text-gray-400 mb-3')}>Hello! My name is Brittany and I enjoy creating things that live on the internet. My interest in web development started back in 2012 when I decided to try editing custom Tumblr themes — turns out hacking together a custom reblog button taught me a lot about HTML & CSS!</p>

              <p className={classNames('text-md font-medium text-gray-500 dark:text-gray-400 mb-3')}>Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences at Upstatement for a variety of clients.</p>

              <p className={classNames('text-md font-medium text-gray-500 dark:text-gray-400 mb-3')}>I also recently launched a course that covers everything you need to build a web app with the Spotify API using Node & React.</p>
            </div>

            <div>
              <p className={classNames('text-md font-medium text-gray-500 dark:text-gray-400 mb-3')}>Here are a few technologies I've been working with recently:</p>
              <ul className={classNames(styles.skill__list)}>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>JavaScript (ES6+)</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>Webpack</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>ReactJS</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>Wordpress</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>NextJS</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>PHP</li>
                <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>NodeJS</li>
              </ul>
            </div>
          </div>
          <div className={classNames(styles.about__right_wrap)}>
            <Image 
              src='/person.jpg'
              priority={false}
              className={classNames(styles.self__image)}
              height={500}
              width={500}
              alt=''
            />
          </div>
        </div>
    );
};

export default AboutMe;