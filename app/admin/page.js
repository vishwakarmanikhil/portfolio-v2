import { requireAdmin } from '@/lib/adminAuth';
import { istDate } from '@/lib/enquiryOptions';
import EnquiriesDashboard from './EnquiriesDashboard';

// The list loads through POST /admin/api/enquiries; this page only checks the
// login and passes today's date (IST) as the default range.
export default async function AdminEnquiries() {
    await requireAdmin();
    return <EnquiriesDashboard today={istDate()} />;
}
