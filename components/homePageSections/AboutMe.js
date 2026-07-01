import classNames from 'classnames';
import styles from './style.module.css';
import Image from 'next/image';

const AboutMe = () => {

  return (
    <div className={classNames(styles.about__container)}>
      <div className={classNames(styles.about__left_wrap)} data-aos='fade-up' data-aos-delay='100'>
        <div>
          <p className={classNames('text-base font-medium text-gray-500 dark:text-gray-400 mb-3')}>Hi! I&apos;m Nikhil Vishwakarma. I enjoy exploring the internet for technology insights and implementing them hands-on for &apos;&apos;Learning by Doing&apos;&apos;. I began my career in a logistics company as a support associate for data verification. While working with CRM, I found myself debugging and reporting issues, sparking my passion for engineering.</p>

          <div className={classNames('text-base font-medium text-gray-500 dark:text-gray-400 mb-3')}>Today, with 5+ years of experience across <a href='https://www.apl.com/' target='_blank' title='APL India Private Limited' className={classNames('text-sky-500 hover:text-sky-600 hover:underline')}>logistics</a>, <a href='https://www.bhaktivedantahospital.com/' target='_blank' title='Bhaktivedanta Hospital & Research Institute' className={classNames('text-sky-500 hover:text-sky-600 hover:underline')}>healthcare</a>, <a href='https://infratech.ind.in/' target='_blank' title='Infratech' className={classNames('text-sky-500 hover:text-sky-600 hover:underline')}>real estate</a>, and <a href='https://bookanartist.co/' target='_blank' title='Book An Artist' className={classNames('text-sky-500 hover:text-sky-600 hover:underline')}>SaaS</a>, I now lead engineering at <a href='https://aartas.com/' target='_blank' title='Aartas' className={classNames('text-sky-500 hover:text-sky-600 hover:underline')}>Aartas</a> — building scalable healthcare platforms, leading cross-functional teams, and architecting cloud infrastructure to help doctors deliver better patient care.</div>

          <p className={classNames('text-base font-medium text-gray-500 dark:text-gray-400 mb-3')}>Outside of work, I enjoy being a helping hand and visiting temples to delve deeper into Indian sanskriti. !! Hare Krishna<span>❤ </span>
            !!</p>
        </div>

        <div>
          <p className={classNames('text-base font-medium text-gray-500 dark:text-gray-400 mb-3')}>Here are some technologies I&apos;ve actively engaged with recently:</p>
          <ul className={classNames(styles.skill__list)}>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>JavaScript</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>TypeScript</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>ReactJS</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>NextJS</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>NodeJS</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>AWS</li>
            <li className={classNames(styles.skill__item, 'text-xs font-medium text-gray-500 dark:text-gray-400')}>Redis</li>
          </ul>
        </div>
      </div>
      <div className={classNames(styles.about__right_wrap)} data-aos='zoom-in' data-aos-delay='100'>
        <div className={classNames(styles.self_image__wrap)}>
          <div className={classNames(styles.self_image__overlay)}></div>
          <Image
            src='https://ik.imagekit.io/vishwakarmanikhil/portfolio-v2/person.png'
            priority={false}
            className={classNames(styles.self__image)}
            height={500}
            width={500}
            alt={`It's me Nikhil Vishwakarma`}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;