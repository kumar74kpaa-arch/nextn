# **App Name**: BillSwift

## Core Features:

- Template Upload and Parsing: Upload a .docx bill template, parse it, and identify placeholder fields such as {{BILL_TO}}, {{SHIP_TO}}, {{GSTIN}}, {{AMOUNT}}, {{GST_PERCENT}}, {{TAX_AMOUNT}}, {{TOTAL}}, and {{WORK_ORDER_NO}}.
- Editable Form: Display an editable form for fields like Bill To, Ship To, GSTIN, Amount, and GST %. The Bill Number should auto-generate, and the Date should auto-fill. Include an optional 'Work Order No.' field that only appears on the generated bill if filled.
- Live Preview: Show a live, interactive preview of the bill template, which updates dynamically based on the changes in the editable form. Conditionally hide the 'Work Order No.' line if the field is empty.
- Automatic Calculation: Automatically calculate the Tax Amount and Total amount based on the provided Amount and GST percentage.
- Export Options: Enable users to download the filled bill as a PDF or DOCX file, or directly print the bill. Ensure print-ready A4 output.
- Bill Archiving: Store the generated bills in a Firestore database, allowing users to view them later. Note that older bills can be modified or deleted. Consider also limiting how far back the user is able to look in the logs.

## Style Guidelines:

- Primary color: Soft blue (#A0CFEC) to evoke trust and efficiency.
- Background color: Light gray (#F0F4F7) for a clean and professional look.
- Accent color: Subtle green (#90EE90) for success indication.
- Body and headline font: 'PT Sans', a modern and clean sans-serif font for readability.
- Use a clear, simple layout with the editable form on the left and the live preview on the right, inspired by Tally Prime for a keyboard-friendly experience.
- Use simple icons for actions like 'Download,' 'Print,' and 'Save'.
- Minimize animations for a fast, efficient workflow. Avoid unnecessary animations.