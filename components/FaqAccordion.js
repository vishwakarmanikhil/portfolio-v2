import classNames from 'classnames';

// One-column FAQ using native <details>/<summary>: works without JavaScript and
// keeps every answer in the server HTML for search engines and AI crawlers.
const FaqAccordion = ({ items, idPrefix = 'faq', openFirst = true }) => {
    return (
        <div className={classNames('w-full border-t border-gray-200 dark:border-gray-700')}>
            {items?.map((item, key) => (
                <details
                    key={`${idPrefix}-${key}`}
                    id={`${idPrefix}-${key + 1}`}
                    open={openFirst && key === 0}
                    className={classNames('group border-b border-gray-200 dark:border-gray-700')}
                    data-aos='fade-up'
                    data-aos-delay={`${Math.min(key, 4) * 50}`}
                >
                    <summary className={classNames('flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden')}>
                        <h3 className={classNames('text-base md:text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-sky-500 transition-colors')}>{item.question}</h3>
                        <span className={classNames('flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 text-sky-500 transition-transform duration-200 group-open:rotate-45 group-open:border-sky-500')} aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                        </span>
                    </summary>
                    <p className={classNames('pb-6 pr-12 text-base font-medium text-gray-500 dark:text-gray-400')}>{item.answer}</p>
                </details>
            ))}
        </div>
    );
};

export default FaqAccordion;
