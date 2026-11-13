import project from '@/components/projects/enquiro.json';
import ProductPage, { productMetadata } from '@/components/projects/ProductPage';
import EnquiroPreview from '@/components/projects/EnquiroPreview';

export const metadata = productMetadata(project);

export default function EnquiroProject() {
    return <ProductPage project={project} preview={<EnquiroPreview />} />;
}
