import classNames from 'classnames';
import faqList from './faq.json';

const Faq = () => {
    return (
        <div className={classNames('grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8')}>
            {faqList?.map((data, key) => {
                return (
                    <div key={`faq-${key}`} data-aos='fade-up' data-aos-delay={`${(key % 2) * 100}`}>
                        <h3 className={classNames('text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2')}>{data?.question}</h3>
                        <p className={classNames('text-base font-medium text-gray-500 dark:text-gray-400')}>{data?.answer}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Faq;
