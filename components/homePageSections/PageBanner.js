import classNames from 'classnames';
import styles from './style.module.css';

const PageBanner = () => {

    return (
        <div>
            <div className='mb-5' data-aos='fade-up' data-aos-delay='100'>
                <h1 className={classNames('text-sm font-medium text-sky-500 dark:text-sky-500')}>Hi, my name is</h1>
            </div>
            <div className='' data-aos='fade-up' data-aos-delay='200'>
                <h2 className={classNames(styles.main_heading__txt, 'text-gray-800 dark:text-gray-200 font-bold')}>Nikhil Vishwakarma.</h2>
            </div>
            <div className='' data-aos='fade-up' data-aos-delay='200'>
                <h3 className={classNames(styles.main_heading__txt, 'text-gray-600 dark:text-gray-400 font-bold')}>I build things for the web.</h3>
            </div>
            <div className='mt-5 md:w-1/2' data-aos='fade-up' data-aos-delay='300'>
                <p className={classNames('text-md font-medium text-gray-500 dark:text-gray-400')}>
                    I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products at <a href='https://bookanartist.co/' target='_blank' className={classNames('text-sky-500 hover:text-sky-600')}>Book An Artist</a>.
                </p>
            </div>
            <div className='mt-5'>
                <a href='' target='_blank' className="inline-block px-6 py-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900">Check out my Resume!</a>
            </div>
        </div>
    );
};

export default PageBanner;