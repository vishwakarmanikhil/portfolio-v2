import Image from 'next/image';
import classNames from 'classnames';
import project from '@/components/projects/coworkspace.json';
import ProductPage, { productMetadata } from '@/components/projects/ProductPage';

export const metadata = productMetadata(project);

const Preview = () => (
    <figure className={classNames('mb-10')} data-aos='zoom-in'>
        <div className={classNames('overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl shadow-sky-500/10')}>
            <div className={classNames('flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-4 py-3')} aria-hidden="true">
                <span className='h-3 w-3 rounded-full bg-red-400' /><span className='h-3 w-3 rounded-full bg-yellow-400' /><span className='h-3 w-3 rounded-full bg-green-400' />
                <span className='ml-3 truncate rounded bg-white dark:bg-gray-900 px-3 py-0.5 text-xs text-gray-500 dark:text-gray-400'>coworkspace.nikhilvishwakarma.com</span>
            </div>
            <Image src={project.image} alt={project.imageAlt} width={1440} height={900} sizes='(max-width: 1000px) 100vw, 1000px' className='h-auto w-full' priority />
        </div>
        <figcaption className={classNames('mt-3 text-center text-sm text-gray-500 dark:text-gray-400')}>The public website. The client portal and admin panel are shown in the live demo.</figcaption>
    </figure>
);

export default function CoworkspaceProject() {
    return <ProductPage project={project} preview={<Preview />} />;
}
