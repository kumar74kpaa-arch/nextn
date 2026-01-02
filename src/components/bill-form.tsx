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
  const { control, getValues } = useFormContext<Bill>();

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
                  <Textarea placeholder="Who is this bill to?" {...field} rows={4} />
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
                  <Textarea placeholder="Where to ship the items?" {...field} rows={4}/>
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
                  <Input {...field} />
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
            name="placeOfSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place of Supply</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., U P" {...field} />
                </FormControl>
                 <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={control}
            name="stateCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State Code</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 09" {...field} />
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
                <FormLabel>Client GSTIN</FormLabel>
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
            <CardTitle>Item Details</CardTitle>
            <CardDescription>Describe the item being billed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <FormField
                control={control}
                name="itemDescription"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Item Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="e.g., Towards Contractual Works" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={control}
                name="hsnSac"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>HSN/SAC</FormLabel>
                    <FormControl>
                    <Input placeholder="e.g., 995464" {...field} />
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
            <div className="grid grid-cols-1 gap-4">
                <FormField
                    control={control}
                    name="amount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subtotal Amount</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="cgstPercent"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>CGST (%)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 9" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="sgstPercent"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>SGST (%)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 9" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={control}
                    name="cgstAmount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>CGST Amount</FormLabel>
                        <FormControl>
                        <Input readOnly value={field.value.toFixed(2)} className="bg-muted/60 font-medium" />
                        </FormControl>
                    </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="sgstAmount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>SGST Amount</FormLabel>
                        <FormControl>
                        <Input readOnly value={field.value.toFixed(2)} className="bg-muted/60 font-medium" />
                        </FormControl>
                    </FormItem>
                    )}
                />
             </div>
              <FormField
                  control={control}
                  name="totalAmount"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Total Amount</FormLabel>
                      <FormControl>
                      <Input readOnly value={`₹ ${field.value.toFixed(2)}`} className="bg-muted/60 font-bold text-base" />
                      </FormControl>
                  </FormItem>
                  )}
              />
               <FormField
                  control={control}
                  name="totalAmountInWords"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Total in Words</FormLabel>
                      <FormControl>
                      <Input readOnly value={field.value} className="bg-muted/60" />
                      </FormControl>
                  </FormItem>
                  )}
              />
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle>Invoice Footer</CardTitle>
            <CardDescription>Additional details for the invoice footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <FormField
                control={control}
                name="invoiceDescription"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Invoice Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="e.g., Towards Contractual Works" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
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
                                <p className="text-xs text-muted-foreground">{bill.billTo?.split('\n')[0]} - {bill.date}</p>
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
