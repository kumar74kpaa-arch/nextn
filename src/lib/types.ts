
export type BillItem = {
  description: string;
  hsnSac?: string;
  totalValue?: number;
  dueNowPercent?: number;
  dueNowAmount: number;
};

export type Bill = {
  companyName?: string;
  companyAddress?: string;
  companyGstin?: string;
  companyState?: string;
  companyEmail?: string;
  billNo: string;
  date: string;
  billTo: string;
  shipTo: string;
  placeOfSupply?: string;
  stateCode?: string;
  gstin?: string;
  workOrderNo?: string;
  items: BillItem[];
  invoiceDescription?: string;
  amount: number; // This will be the subtotal (sum of dueNowAmount from items)
  cgstPercent: number;
  sgstPercent: number;
  cgstAmount: number;
  sgstAmount: number;
  totalAmount: number;
  taxAmountInWords?: string;
  totalAmountInWords?: string;
};
