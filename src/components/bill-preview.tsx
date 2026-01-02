'use client';
import type { Bill } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BillPreviewProps {
  bill: Bill;
}

export default function BillPreview({ bill }: BillPreviewProps) {
  const { billTo, shipTo, billNo, date, workOrderNo, gstin, amount, gstPercent, taxAmount, totalAmount } = bill;

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== 'number') return '₹ 0.00';
    return `₹ ${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return (
    <div id="bill-preview-content" className="printable-area bg-white rounded-lg shadow-lg h-full max-w-4xl mx-auto p-4 lg:p-12 text-sm text-gray-800">
      <header className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 uppercase">Tax Invoice</h1>
          {/* Company details would go here */}
        </div>
        <div className="text-right">
            <p className="font-semibold">Invoice No: <span className="font-normal">{billNo || 'N/A'}</span></p>
            <p className="font-semibold">Date: <span className="font-normal">{date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB') : 'N/A'}</span></p>
            {workOrderNo && (
                <p className="font-semibold">Work Order No: <span className="font-normal">{workOrderNo}</span></p>
            )}
        </div>
      </header>
      
      <section className="grid grid-cols-2 gap-10 mb-10">
        <div>
            <h2 className="text-xs uppercase text-gray-500 font-bold mb-2 border-b pb-1">Bill To</h2>
            <p className="font-semibold whitespace-pre-wrap">{billTo || 'Client Name'}</p>
        </div>
         <div>
            <h2 className="text-xs uppercase text-gray-500 font-bold mb-2 border-b pb-1">Ship To</h2>
            <p className="font-semibold whitespace-pre-wrap">{shipTo || 'Shipping Address'}</p>
        </div>
      </section>

      {gstin && <p className="mb-8 font-semibold">GSTIN: <span className="font-normal">{gstin}</span></p>}

      <section>
        <table className="w-full mb-10">
            <thead className="bg-gray-100">
                <tr>
                    <th className="p-3 text-left font-bold text-gray-600 uppercase">Description</th>
                    <th className="p-3 text-right font-bold text-gray-600 uppercase">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b">
                    <td className="p-3">Service or Product Provided</td>
                    <td className="p-3 text-right">{formatCurrency(amount)}</td>
                </tr>
            </tbody>
        </table>
      </section>

      <section className="flex justify-end">
        <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">{formatCurrency(amount)}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-gray-600">GST ({gstPercent || 0}%)</p>
                <p className="font-semibold">{formatCurrency(taxAmount)}</p>
            </div>
            <Separator className="my-2 bg-gray-300"/>
            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">{formatCurrency(totalAmount)}</p>
            </div>
        </div>
      </section>
      
      <footer className="mt-20 pt-5 border-t text-xs text-gray-500 text-center">
        <p>Thank you for your business!</p>
        <p>Company Name | company@email.com | +91 12345 67890</p>
      </footer>
    </div>
  );
}
