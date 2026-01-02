'use client';

import { Save, Printer, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';

interface AppHeaderProps {
  onSave: () => void;
  onPrint: () => void;
  onDownload: (format: 'PDF' | 'DOCX') => void;
}

export default function AppHeader({ onSave, onPrint, onDownload }: AppHeaderProps) {
  return (
    <header className="no-print flex h-16 items-center justify-between border-b bg-card px-6 shrink-0">
      <div className="flex items-center gap-3">
        <Image src="https://img.freepik.com/premium-vector/paper-people-check-mark-logo-vector-icon-illustration_7688-3628.jpg?semt=ais_hybrid&w=740&q=80" alt="BillSwift Logo" width={32} height={32} className="rounded-sm" data-ai-hint="logo checkmark" />
        <h1 className="text-xl font-bold tracking-tight text-foreground font-headline">
          BillSwift
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" onClick={onPrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <FileDown className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onDownload('PDF')}>
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDownload('DOCX')}>
              Download DOCX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
