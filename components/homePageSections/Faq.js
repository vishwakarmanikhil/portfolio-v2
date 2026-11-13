import faqList from './faq.json';
import FaqAccordion from '../FaqAccordion';

const Faq = () => <FaqAccordion items={faqList} idPrefix='faq' />;

export default Faq;
