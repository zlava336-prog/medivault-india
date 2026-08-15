import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { adminMedicineService } from '../../services/adminMedicineService';
import { medicineService } from '../../services/medicineService';

export const AdminImportExportPage: React.FC = () => {
  const [fileContent, setFileContent] = useState<string>('');
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [importing, setImporting] = useState(false);
  const [report, setReport] = useState<{ success: number; failed: number } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setFileContent(text);
      try {
        if (file.name.endsWith('.json')) {
          const json = JSON.parse(text);
          setParsedData(Array.isArray(json) ? json : [json]);
        } else {
          // Simple CSV line parser
          const lines = text.split('\n').filter((l) => l.trim());
          const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
          const rows = lines.slice(1).map((line) => {
            const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
            const obj: any = {};
            headers.forEach((h, i) => {
              obj[h] = values[i];
            });
            return obj;
          });
          setParsedData(rows);
        }
      } catch (err: any) {
        alert('Invalid file format: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleCommitImport = async () => {
    if (parsedData.length === 0) return;
    setImporting(true);
    let success = 0;
    let failed = 0;

    for (const record of parsedData) {
      try {
        await adminMedicineService.saveMedicine({
          generic_name: record.generic_name,
          salt: record.salt || record.active_ingredient,
          description: record.description,
          strength: record.strength,
          mechanism_of_action: record.mechanism_of_action,
          verification_status: 'draft', // Safety: Import as draft first
        });
        success++;
      } catch {
        failed++;
      }
    }

    setReport({ success, failed });
    setImporting(false);
  };

  const handleExportJson = async () => {
    const res = await medicineService.getMedicines({ pageSize: 100 });
    const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medivault_medicines_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <Breadcrumbs items={[{ label: 'Admin', path: '/admin' }, { label: 'Import & Export' }]} />

      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Upload className="w-6 h-6 text-blue-400" />
          Batch CSV / JSON Import & Export Pipeline
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Import verified catalogs as Drafts with automatic duplicate checks
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Upload Card */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-teal-400" /> Upload File (CSV or JSON)
          </h2>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700"
          />
        </div>

        {/* Export Card */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-indigo-400" /> Export Database
          </h2>
          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Full JSON Monograph Database
          </button>
        </div>
      </div>

      {/* Staged Diff Preview */}
      {parsedData.length > 0 && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white">Staged Preview ({parsedData.length} records)</h3>
            <button
              onClick={handleCommitImport}
              disabled={importing}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {importing ? 'Importing...' : 'Commit to Database'}
            </button>
          </div>

          <div className="max-h-60 overflow-y-auto space-y-1.5">
            {parsedData.slice(0, 10).map((r, i) => (
              <div key={i} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs flex items-center justify-between">
                <span className="font-bold text-white">{r.generic_name}</span>
                <span className="text-slate-400 font-mono">{r.salt || r.active_ingredient}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {report && (
        <div className="p-4 bg-teal-950/40 border border-teal-800 rounded-2xl text-xs text-teal-300">
          Batch Complete: {report.success} monographs saved as Draft, {report.failed} failed.
        </div>
      )}
    </div>
  );
};
