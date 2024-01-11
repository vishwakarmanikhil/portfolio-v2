import classNames from 'classnames';
import styles from './style.module.css';

const ContactMe = () => {

    return (
        <div className={classNames('flex flex-col text-center items-center')}>
            <h2 className={classNames('text-sm font-medium text-sky-500 dark:text-sky-500 text-center mb-2')}>What's Next?</h2>
            <h2 className={classNames(styles.contact_title__txt, 'font-bold text-gray-800 dark:text-gray-200 mb-5')}>Get In Touch</h2>
            <p className={classNames('text-lg font-light mb-16')}>Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            <a href='mailto:menikhilv143@gmail.com' className="inline-block p-4 me-2 mb-2 text-sm font-medium text-sky-500 focus:outline-none bg-white rounded-lg border border-sky-500 hover:bg-gray-100 hover:text-sky-600 hover:border-sky-600 focus:z-10 focus:ring-4 focus:ring-transparent dark:bg-transparent hover:dark:bg-sky-900 min-w-36">Say Hello</a>
        </div>
    );
};

export default ContactMe;