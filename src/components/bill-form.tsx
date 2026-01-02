'use client';
import { useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Bill } from '@/lib/types';
import { Button } from './ui/button';

interface BillFormProps {
    bills: Partial<Bill>[];
    onLoadBill: (bill: Partial<Bill>) => void;
}

export default function BillForm({ bills, onLoadBill }: BillFormProps) {
  const { control } = useFormContext<Bill>();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
          <CardDescription>Enter the billing and shipping information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="billTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill To</FormLabel>
                <FormControl>
                  <Textarea placeholder="Who is this bill to?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="shipTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ship To</FormLabel>
                <FormControl>
                  <Textarea placeholder="Where to ship the items?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>Provide invoice-specific numbers and dates.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="billNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Invoice No.</FormLabel>
                <FormControl>
                  <Input {...field} readOnly className="bg-muted/60" />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 29ABCDE1234F1Z5" {...field} />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="workOrderNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work Order No. (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., WO-2024-001" {...field} />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Amount & Taxes</CardTitle>
            <CardDescription>All amounts are in INR.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="amount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="gstPercent"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>GST (%)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 18" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="taxAmount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tax Amount</FormLabel>
                        <FormControl>
                        <Input readOnly value={field.value.toFixed(2)} className="bg-muted/60 font-medium" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="totalAmount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl>
                        <Input readOnly value={field.value.toFixed(2)} className="bg-muted/60 font-bold text-base" />
                        </FormControl>
                    </FormItem>
                    )}
                />
             </div>
        </CardContent>
      </Card>
      <Accordion type="single" collapsible>
        <AccordionItem value="recent-bills">
            <AccordionTrigger className='text-sm font-medium'>Recent Bills</AccordionTrigger>
            <AccordionContent>
                <Card>
                    <CardContent className="p-4 space-y-2">
                        {bills.map((bill) => (
                        <div key={bill.billNo} className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                            <div>
                                <p className="font-semibold text-sm">{bill.billNo}</p>
                                <p className="text-xs text-muted-foreground">{bill.billTo} - {bill.date}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className="font-mono text-sm text-foreground">₹{bill.totalAmount?.toLocaleString()}</p>
                                <Button variant="ghost" size="sm" onClick={() => onLoadBill(bill)}>Load</Button>
                            </div>
                        </div>
                        ))}
                    </CardContent>
                </Card>
            </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
