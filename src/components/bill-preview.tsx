
'use client';
import type { Bill } from '@/lib/types';
import Image from 'next/image';

interface BillPreviewProps {
  bill: Bill;
}

export default function BillPreview({ bill }: BillPreviewProps) {
  const { 
    billTo, 
    shipTo, 
    billNo, 
    date, 
    workOrderNo, 
    gstin, 
    amount, 
    cgstPercent, 
    sgstPercent,
    cgstAmount,
    sgstAmount,
    totalAmount,
    items,
    invoiceDescription,
    totalAmountInWords,
    placeOfSupply,
    stateCode
  } = bill;

  const formatCurrency = (value: number | undefined) => {
    if (typeof value !== 'number') return '0.00';
    return value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  
  const emptyRowsCount = items ? Math.max(0, 8 - items.length) : 8;

  return (
    <div id="bill-preview-content" className="printable-area bg-white rounded-none shadow-lg h-full max-w-4xl mx-auto p-8 text-[9pt] text-black font-verdana">
      <style jsx global>{`
        .font-verdana {
          font-family: 'Verdana', sans-serif;
        }
        .text-black {
          color: #000;
        }
      `}</style>
      
      <header className="grid grid-cols-3 items-start mb-4">
        <div className="col-span-1">
          <Image src="https://i.ibb.co/tBS5TqH/logo.png" alt="UNARCH & BUILD Logo" width={96} height={96} data-ai-hint="logo building" />
        </div>
        <div className="col-span-2 text-left -ml-16">
          <h2 className="font-bold text-sm">UNARCH & BUILD</h2>
          <p className='text-[8pt] leading-tight'>104, OC-07, Orange County Amisha</p>
          <p className='text-[8pt] leading-tight'>Khand-1, Ghaziabad, UP-201014</p>
          <p className='text-[8pt] leading-tight'>GSTIN: 09DWTPS 5635F1ZV State</p>
          <p className='text-[8pt] leading-tight'>: Uttar Pradesh, Code : 09</p>
          <p className='text-[8pt] leading-tight'>amitsainii@gmail.com</p>
        </div>
      </header>
      
      <div className='text-center w-full mb-4'>
        <h1 className="text-base font-bold underline">Tax Invoice</h1>
      </div>

      <div className="grid grid-cols-3 mb-2 text-[8pt]">
          <div className='col-span-1'>
              <p className='font-bold'>Bill To</p>
              <p className="whitespace-pre-wrap leading-tight">{billTo}</p>
              <p className="leading-tight">GSTIN: {gstin || 'N/A'}</p>
              {workOrderNo && <p className="leading-tight">Work Order: {workOrderNo}</p>}
          </div>
          <div className='col-span-1'>
              <p className='font-bold'>Ship To</p>
              <p className="whitespace-pre-wrap leading-tight">{shipTo}</p>
          </div>
          <div className='col-span-1 text-right'>
              <div className='flex justify-end'>
                  <span className='w-24 font-bold text-left'>Invoice No.</span>
                  <span>{billNo}</span>
              </div>
              <div className='flex justify-end'>
                  <span className='w-24 font-bold text-left'>Date</span>
                  <span>{date ? new Date(date + 'T00:00:00').toLocaleDateString('en-GB') : 'N/A'}</span>
              </div>
               <div className='flex justify-end mt-2'>
                  <span className='w-24 font-bold text-left'>Place of Supply</span>
                  <span>{placeOfSupply}</span>
              </div>
              <div className='flex justify-end'>
                  <span className='w-24 font-bold text-left'>State</span>
                  <span>Delhi, Code: {stateCode}</span>
              </div>
          </div>
      </div>

      <section>
        <table className="w-full border-collapse border border-black text-[8pt]">
            <thead className="bg-white">
                <tr className='border-b border-black'>
                    <th className="p-1 text-center font-bold border-r border-black w-10">Sl. No.</th>
                    <th className="p-1 text-center font-bold border-r border-black">Item Details</th>
                    <th className="p-1 text-center font-bold border-r border-black w-24">HSN/SAC</th>
                    <th className="p-1 text-center font-bold border-r border-black w-28">Total Value</th>
                    <th className="p-1 text-center font-bold border-r border-black w-24">Due Now in (%)</th>
                    <th className="p-1 text-center font-bold w-32">Due Now in Amount</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item, index) => (
                    <tr className="align-top" key={index}>
                        <td className="p-1 text-center border-r border-black">{index + 1}</td>
                        <td className="p-1 border-r border-black whitespace-pre-wrap">{item.description}</td>
                        <td className="p-1 text-center border-r border-black">{item.hsnSac}</td>
                        <td className="p-1 text-right border-r border-black">{formatCurrency(item.totalValue)}</td>
                        <td className="p-1 text-right border-r border-black">{item.dueNowPercent.toFixed(2)}%</td>
                        <td className="p-1 text-right">{formatCurrency(item.dueNowAmount)}</td>
                    </tr>
                ))}
                {Array.from({ length: emptyRowsCount }).map((_, index) => (
                  <tr className="align-top h-6" key={`empty-${index}`}>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1 border-r border-black"></td>
                    <td className="p-1"></td>
                  </tr>
                ))}
                 <tr className="align-top h-auto">
                    <td className="p-1 border-r border-black border-t border-black"></td>
                    <td className="p-1 border-r border-black border-t border-black"></td>
                    <td className="p-1 border-r border-black border-t border-black"></td>
                    <td className="p-1 border-r border-black border-t border-black"></td>
                    <td className="p-1 border-r border-black border-t border-black"></td>
                    <td className="p-1 border-t border-black"></td>
                </tr>
            </tbody>
        </table>
      </section>

      <section className="flex justify-between mt-0">
          <div className='w-1/2 text-[8pt]'>
             <p className='font-bold mt-2'>Tax Amount: <span className='font-normal'>{totalAmountInWords?.replace('Rupees ', '').replace(' Only', '')}</span></p>
             <p className='font-bold mt-1'>Total Amount: <span className='font-normal'>{totalAmountInWords}</span></p>
          </div>
        <div className="w-1/2 max-w-sm space-y-0 text-[8pt]">
             <div className="flex justify-between border-t border-black">
                <p className="p-1 font-bold">SUB TOTAL</p>
                <p className="p-1 font-bold">{formatCurrency(amount)}</p>
            </div>
            <div className="flex justify-between">
                <p className="p-1">CGST @ {cgstPercent || 0}.00 %</p>
                <p className="p-1">{formatCurrency(cgstAmount)}</p>
            </div>
             <div className="flex justify-between">
                <p className="p-1">SGST @ {sgstPercent || 0}.00 %</p>
                <p className="p-1">{formatCurrency(sgstAmount)}</p>
            </div>
            <div className="flex justify-between bg-white border-t border-b border-black">
                <p className="p-1 font-bold">TOTAL</p>
                <p className="p-1 font-bold">₹ {formatCurrency(totalAmount)}</p>
            </div>
        </div>
      </section>
      
       <section className="flex justify-between mt-2">
          <div className='w-1/2'>
            <p className='font-bold text-[8pt] mt-2'>Invoice Description: <span className='font-normal'>{invoiceDescription}</span></p>
            <div className='text-[8pt] mt-2'>
              <p>We declare that this invoice shows the actual price of the goods</p>
              <p>described and that all particulars are true and correct.</p>
            </div>
          </div>
          <div></div>
      </section>
      
      <footer className="mt-4 text-[8pt]">
         <div className='grid grid-cols-2'>
            <div></div>
            <div className='text-center'>
              <p>For UNARCH & BUILD</p>
              <div className="h-12"></div>
              <p className='border-t border-black pt-1'>Authorized Signatory</p>
            </div>
         </div>
         <div className="mt-4 p-2 border border-black rounded-md text-center">
            <p className='font-bold'>This is a computer generated invoice</p>
         </div>
         <div className="mt-2 p-2 border border-dashed border-black rounded-md text-[8pt]">
            <p>Payment can be done using IMPS, NEFT, or RTGS to the account details provided below:</p>
            <p className='mt-1'><span className='font-bold w-28 inline-block'>Account Details</span></p>
            <p><span className='font-bold w-28 inline-block'>Bank Name</span>: Axis Bank</p>
            <p><span className='font-bold w-28 inline-block'>Merchant Name</span>: UNARCH & BUILD</p>
            <p><span className='font-bold w-28 inline-block'>Account Number</span>: 924020003854618</p>
            <p><span className='font-bold w-28 inline-block'>IFSC Code</span>: UTIB0000624</p>
         </div>
      </footer>
    </div>
  );
}
