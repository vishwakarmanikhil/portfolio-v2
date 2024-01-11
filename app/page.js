import classNames from 'classnames';
import styles from './page.module.css';
import Experience from '@/components/homePageSections/Experience';
import FeaturedProject from '@/components/homePageSections/FeaturedProjects';
import OtherProjects from '@/components/homePageSections/OtherProjects';
import Link from 'next/link';
import ContactMe from '@/components/homePageSections/ContactMe';
import AboutMe from '@/components/homePageSections/AboutMe';
import PageBanner from '@/components/homePageSections/PageBanner';

export default function Home() {

  return (
    <div className={classNames(styles.main)}>
      <section className={classNames(styles.hero__section)} id='main'>
        <PageBanner />
      </section>

      <section className={classNames(styles.section__style, styles.about__section)} id='about'>
        <div>
          <h2 className={classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold')}>About Me</h2>
        </div>
        <AboutMe />
      </section>

      <section className={classNames(styles.section__style, styles.experience__section)} id='experience'>
        <div>
          <h2 className={classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold')}>Where I've Worked</h2>
        </div>
        <div>
          <Experience />
        </div>
      </section>

      <section className={classNames(styles.section__style, styles.featured_project__section)} id='work'>
        <div>
          <h2 className={classNames(styles.section__title, 'text-2xl text-gray-800 dark:text-gray-200 font-bold')}>Some Things I've Built</h2>
        </div>
        <div>
          <FeaturedProject />
        </div>
      </section>

      <section className={classNames(styles.section__style, styles.featured_project__section)} id='otherProject'>
        <div>
          <h2 className={classNames('text-2xl text-gray-800 dark:text-gray-200 font-bold text-center')}>Other Noteworthy Projects</h2>
        </div>
        <div>
          <OtherProjects />

          <div className={classNames('text-center')}>
            <Link href={'/archive'} className="inline-block p-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900">view the archive</Link>
          </div>
        </div>
      </section>

      <section className={classNames(styles.section__style, styles.featured_project__contact)} id='contact'>
        <ContactMe />
      </section>
    </div>
  )
}
