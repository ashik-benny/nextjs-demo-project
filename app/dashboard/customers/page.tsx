import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { CustomerTableSkeleton, InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomerPages } from '@/app/lib/data';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'customers', 
};  


export default async function Customers({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // console.log("🚀 ~ file: page.tsx:27 ~ currentPage:", currentPage)
  const totalPages = await fetchCustomerPages(query);
  // console.log("🚀 ~ file: page.tsx:29 ~ totalPages:", totalPages)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
       <Suspense key={query + currentPage} fallback={<CustomerTableSkeleton />}>
        <CustomersTable search={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};