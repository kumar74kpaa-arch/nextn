'use client';

import * as React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Bill } from '@/lib/types';
import AppHeader from '@/components/app-header';
import BillForm from '@/components/bill-form';
import BillPreview from '@/components/bill-preview';
import { useToast } from '@/hooks/use-toast';

const billSchema = z.object({
  billNo: z.string().min(1, 'Bill No. is required'),
  date: z.string().min(1, 'Date is required'),
  billTo: z.string().min(1, 'This field is required'),
  shipTo: z.string().min(1, 'This field is required'),
  gstin: z.string().optional(),
  workOrderNo: z.string().optional(),
  amount: z.coerce.number().positive({ message: 'Amount must be greater than 0' }),
  gstPercent: z.coerce.number().min(0, 'GST % must be non-negative').max(100, 'GST % cannot exceed 100'),
  taxAmount: z.number(),
  totalAmount: z.number(),
});

// Mock data for recent bills feature
const recentBills: Partial<Bill>[] = [
  { billNo: 'INV-1023', date: '2023-10-25', totalAmount: 1180, billTo: 'Tech Corp' },
  { billNo: 'INV-1022', date: '2023-10-20', totalAmount: 590, billTo: 'Innovate LLC' },
  { billNo: 'INV-1021', date: '2023-10-15', totalAmount: 2360, billTo: 'Solutions Inc' },
];

export default function BillSwiftPage() {
  const { toast } = useToast();
  
  const form = useForm<Bill>({
    resolver: zodResolver(billSchema),
    mode: 'onBlur',
    defaultValues: {
      billNo: '',
      date: new Date().toISOString().split('T')[0],
      billTo: '',
      shipTo: '',
      gstin: '',
      workOrderNo: '',
      amount: 0,
      gstPercent: 0,
      taxAmount: 0,
      totalAmount: 0,
    },
  });

  React.useEffect(() => {
    form.setValue('billNo', `INV-${String(Date.now()).slice(-4)}`);
  }, [form]);


  const watchedValues = form.watch();
  const { amount, gstPercent } = watchedValues;

  React.useEffect(() => {
    const parsedAmount = typeof amount === 'number' ? amount : 0;
    const parsedGstPercent = typeof gstPercent === 'number' ? gstPercent : 0;
    
    const tax = (parsedAmount * parsedGstPercent) / 100;
    const total = parsedAmount + tax;
    
    form.setValue('taxAmount', tax, { shouldValidate: true });
    form.setValue('totalAmount', total, { shouldValidate: true });
  }, [amount, gstPercent, form]);

  const handlePrint = () => {
    window.print();
  };

  const handleSave = form.handleSubmit((data) => {
    console.log('Saving bill:', data);
    // Here you would typically send the data to your backend/Firestore
    toast({
      title: "Bill Saved",
      description: `Bill ${data.billNo} has been saved successfully.`,
    });
  });

  const handleDownload = (format: 'PDF' | 'DOCX') => {
    toast({
      title: `Download ${format}`,
      description: `Generating ${format} file... (This is a demo)`,
    });
    // In a real app, you'd use a library like jsPDF or docx to generate the file.
  };

  const loadBill = (billData: Partial<Bill>) => {
    // A real implementation would fetch the full bill from a database
    form.reset({
      ...form.getValues(), // keep current values for fields not in billData
      ...billData,
      amount: billData.totalAmount ? billData.totalAmount / 1.18 : 0, // Mock reverse calculation
      gstPercent: 18, // Mock value
    });
     toast({
      title: "Bill Loaded",
      description: `Bill ${billData.billNo} data loaded into the form.`,
    });
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col h-screen bg-background text-foreground font-body">
        <AppHeader
          onPrint={handlePrint}
          onSave={handleSave}
          onDownload={handleDownload}
        />
        <main className="flex-1 grid lg:grid-cols-2 gap-4 xl:gap-8 p-4 overflow-hidden">
          <div className="no-print flex flex-col gap-4 overflow-y-auto pb-4">
             <BillForm bills={recentBills} onLoadBill={loadBill} />
          </div>
          <div className="printable-area-container bg-background lg:bg-transparent lg:overflow-y-auto p-0 lg:p-4">
            <BillPreview bill={watchedValues} />
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
