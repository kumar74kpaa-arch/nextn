export type Bill = {
  billNo: string;
  date: string;
  billTo: string;
  shipTo: string;
  gstin?: string;
  workOrderNo?: string;
  amount: number;
  gstPercent: number;
  taxAmount: number;
  totalAmount: number;
};
