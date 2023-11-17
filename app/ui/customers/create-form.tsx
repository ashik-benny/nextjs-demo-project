'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon, 
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';


export default function CustomerForm() {

  const initialState = { message: null, errors: {} };
  const [state, addCustomer] = useFormState(createCustomer, initialState);

  return (
    <form action={addCustomer}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/*  Name */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Add Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
              {state.errors?.name ? (
                <div
                  id="name-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.name.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Add Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="Enter Email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
              {state.errors?.email ? (
                <div
                  id="email-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.email.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
        </div>

        {/* password */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Add Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="text"
                placeholder="Create Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="password-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
              {state.errors?.password ? (
                <div
                  id="password-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.password.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
        </div>

      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Add User</Button>
      </div>
    </form>
  );
}
