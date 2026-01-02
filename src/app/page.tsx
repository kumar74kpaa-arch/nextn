
'use client';

import * as React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { Bill } from '@/lib/types';
import AppHeader from '@/components/app-header';
import BillForm from '@/components/bill-form';
import BillPreview from '@/components/bill-preview';
import { useToast } from '@/hooks/use-toast';
import { numberToWords } from '@/lib/utils';

const billItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  hsnSac: z.string().optional(),
  totalValue: z.coerce.number().min(0),
  dueNowPercent: z.coerce.number().min(0).max(100),
  dueNowAmount: z.coerce.number().min(0),
});

const billSchema = z.object({
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyGstin: z.string().optional(),
  companyState: z.string().optional(),
  companyEmail: z.string().optional(),
  billNo: z.string().min(1, 'Bill No. is required'),
  date: z.string().min(1, 'Date is required'),
  billTo: z.string().min(1, 'This field is required'),
  shipTo: z.string().min(1, 'This field is required'),
  placeOfSupply: z.string().optional(),
  stateCode: z.string().optional(),
  gstin: z.string().optional(),
  workOrderNo: z.string().optional(),
  items: z.array(billItemSchema).min(1, "At least one item is required"),
  invoiceDescription: z.string().optional(),
  amount: z.coerce.number().positive({ message: 'Amount must be greater than 0' }),
  cgstPercent: z.coerce.number().min(0).max(100),
  sgstPercent: z.coerce.number().min(0).max(100),
  cgstAmount: z.number(),
  sgstAmount: z.number(),
  totalAmount: z.number(),
  taxAmountInWords: z.string().optional(),
  totalAmountInWords: z.string().optional(),
});

// Mock data for recent bills feature
const recentBills: Partial<Bill>[] = [
  { billNo: 'INV-1023', date: '2023-10-25', totalAmount: 1454868.00, billTo: 'Amba Switchgears' },
  { billNo: 'INV-1022', date: '2023-10-20', totalAmount: 590, billTo: 'Innovate LLC' },
  { billNo: 'INV-1021', date: '2023-10-15', totalAmount: 2360, billTo: 'Solutions Inc' },
];

export default function BillSwiftPage() {
  const { toast } = useToast();
  const [isClient, setIsClient] = React.useState(false);
  
  const form = useForm<Bill>({
    resolver: zodResolver(billSchema),
    mode: 'onBlur',
    defaultValues: {
      companyName: 'UNARCH & BUILD',
      companyAddress: '104, OC-07, Orange County Amisha\nKhand-1, Ghaziabad, UP-201014',
      companyGstin: '09DWTPS 5635F1ZV',
      companyState: 'Uttar Pradesh, Code : 09',
      companyEmail: 'amitsainii@gmail.com',
      billNo: '',
      date: new Date().toISOString().split('T')[0],
      billTo: 'Amba Switchgears\nLand No- 152, Junction road\nIndustrial area, UP- 203131',
      shipTo: 'Amba Switchgears\nLand No- 152, Junction road\nIndustrial area, UP- 203131',
      placeOfSupply: 'U P',
      stateCode: '09',
      gstin: '09ABZFA98281Z0',
      workOrderNo: '',
      items: [
        { 
          description: 'Towards Contractual Works', 
          hsnSac: '995464', 
          totalValue: 1266838.00, 
          dueNowPercent: 100, 
          dueNowAmount: 1266838.00 
        }
      ],
      invoiceDescription: 'Towards Contractual Works',
      amount: 1266838.00,
      cgstPercent: 9,
      sgstPercent: 9,
      cgstAmount: 0,
      sgstAmount: 0,
      totalAmount: 0,
      taxAmountInWords: '',
      totalAmountInWords: '',
    },
  });

  React.useEffect(() => {
    setIsClient(true);
    form.setValue('billNo', `URSS-24/021`);
  }, [form]);


  const watchedValues = form.watch();
  const { amount, cgstPercent, sgstPercent } = watchedValues;

  React.useEffect(() => {
    // This logic is now disabled to allow manual subtotal entry.
    // The subtotal is calculated based on items, but manual override is possible.
    /*
    const sub = watchedValues.items.reduce((acc, item) => {
        const totalValue = typeof item.totalValue === 'number' ? item.totalValue : 0;
        const dueNowPercent = typeof item.dueNowPercent === 'number' ? item.dueNowPercent : 0;
        const dueNowAmount = (totalValue * dueNowPercent) / 100;
        return acc + dueNowAmount;
    }, 0);
    form.setValue('amount', sub);
    */
  }, [watchedValues.items, form]);


  React.useEffect(() => {
    const parsedSubtotal = typeof amount === 'number' ? amount : 0;
    const parsedCgstPercent = typeof cgstPercent === 'number' ? cgstPercent : 0;
    const parsedSgstPercent = typeof sgstPercent === 'number' ? sgstPercent : 0;
    
    const cgst = (parsedSubtotal * parsedCgstPercent) / 100;
    const sgst = (parsedSubtotal * parsedSgstPercent) / 100;
    const total = parsedSubtotal + cgst + sgst;
    const totalTax = cgst + sgst;
    
    form.setValue('cgstAmount', cgst, { shouldValidate: true });
    form.setValue('sgstAmount', sgst, { shouldValidate: true });
    form.setValue('totalAmount', total, { shouldValidate: true });
    form.setValue('taxAmountInWords', `${numberToWords(totalTax)}`, { shouldValidate: true });
    form.setValue('totalAmountInWords', `Rupees ${numberToWords(total)} Only`, { shouldValidate: true });

  }, [amount, cgstPercent, sgstPercent, form]);

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
    // This function would need to be updated to handle multiple items if the mock data supported it.
    // For now, it will reset with a single item structure.
    form.reset({
      ...form.getValues(), // keep current values for fields not in billData
      billNo: billData.billNo,
      date: billData.date,
      billTo: billData.billTo,
      totalAmount: billData.totalAmount,
      amount: billData.totalAmount ? billData.totalAmount / 1.18 : 0,
      items: [{
        description: 'Loaded Item',
        hsnSac: '',
        totalValue: billData.totalAmount ? billData.totalAmount / 1.18 : 0,
        dueNowPercent: 100,
        dueNowAmount: billData.totalAmount ? billData.totalAmount / 1.18 : 0,
      }],
      cgstPercent: 9,
      sgstPercent: 9,
    });
     toast({
      title: "Bill Loaded",
      description: `Bill ${billData.billNo} data loaded into the form.`,
    });
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return (
    <FormProvider {...form}>
      <div className="flex flex-col h-screen bg-neutral-100 text-foreground font-body">
        <AppHeader
          onPrint={handlePrint}
          onSave={handleSave}
          onDownload={handleDownload}
        />
        <main className="flex-1 grid lg:grid-cols-2 gap-4 xl:gap-8 p-4 overflow-hidden">
          <div className="no-print flex flex-col gap-4 overflow-y-auto pb-4">
             <BillForm bills={recentBills} onLoadBill={loadBill} />
          </div>
          <div className="printable-area-container bg-neutral-100 lg:overflow-y-auto lg:p-4">
            <BillPreview bill={watchedValues} />
          </div>
        </main>
      </div>
    </FormProvider>
  );
}
