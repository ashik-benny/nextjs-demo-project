'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Error from "../dashboard/invoices/error"
import { signIn } from '@/auth';

const FormSchema = z.object({
    // id: z.string(),
    // customerId: z.string(),
    // amount: z.coerce.number(),
    // status: z.enum(['pending', 'paid']),
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // const amountInCents = amount * 100;
    // // const date = new Date().toISOString().split('T')[0];
    // const dateTime = new Date().toISOString();
    // const date = dateTime.split('T')[0];

      // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    try {
        // SQL QUERRY FOR ADDING INTO DATABASE
        await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
        // return { message: 'Created Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Create Invoice.' };
    }

    // REMOVE CACHE & REVALIDATE ROUTE
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

};

export async function updateInvoice(id:any, prevState: State, formData: FormData) {
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;


    try {
        // SQL QUERRY FOR UPDATING DATA IN DATABASE
        await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id} `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    // REMOVE CACHE & REVALIDATE ROUTE
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
};

export async function deleteInvoice(id:string) {
    
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted Invoice.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Invoice.' };
    }
};

export async function authenticate( prevState: string | undefined, formData: FormData) {
    try {
      await signIn('credentials', Object.fromEntries(formData));
    } catch (error) { 
      if ((error as Error).message.includes('CredentialsSignin')) {
        return 'CredentialSignin';
      }
      throw error;
    } 
}; 