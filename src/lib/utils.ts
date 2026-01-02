import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberToWords(num: number): string {
    const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    const s = [
        '', 'Thousand', 'Lakh', 'Crore'
    ];

    const convertToWords = (n: number): string => {
        let str = '';
        if (n > 19) {
            str += b[Math.floor(n / 10)] + ' ' + a[n % 10];
        } else {
            str += a[n];
        }
        return str.trim();
    };

    const numStr = Math.floor(num).toString();
    const len = numStr.length;
    
    if (len > 9) return 'Number too large';

    let words = [];
    let i = 0;
    
    // Crores
    if (len > 7) {
        const crores = parseInt(numStr.slice(0, len - 7));
        words.push(convertToWords(crores) + ' ' + s[3]);
        i += len - 7;
    }

    // Lakhs
    if (len > 5) {
        const lakhs = parseInt(numStr.slice(i, len - 5));
        if (lakhs > 0) {
            words.push(convertToWords(lakhs) + ' ' + s[2]);
        }
        i += 2;
         if (len === 6) i = 1;
         if (len === 7) i = 2;
    }

    // Thousands
    if (len > 3) {
        const thousands = parseInt(numStr.slice(i, len - 3));
         if (thousands > 0) {
            words.push(convertToWords(thousands) + ' ' + s[1]);
        }
    }
    
    // Hundreds
    const hundreds = parseInt(numStr.slice(-3));
    if (hundreds > 0) {
        let hundredsStr = '';
        if (hundreds > 99) {
            hundredsStr += a[Math.floor(hundreds / 100)] + ' Hundred';
            if (hundreds % 100 > 0) {
                hundredsStr += ' ' + convertToWords(hundreds % 100);
            }
        } else {
            hundredsStr += convertToWords(hundreds);
        }
        words.push(hundredsStr);
    }

    let result = words.join(' ');
    
    const decimalPart = Math.round((num - Math.floor(num)) * 100);
    if (decimalPart > 0) {
        result += ' and ' + convertToWords(decimalPart) + ' Paisa';
    }

    return result.trim();
}
