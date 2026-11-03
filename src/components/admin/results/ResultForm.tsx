"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { getAuthToken } from '@/lib/auth';
import type { Exam } from '@/types/exam';
import type { Result } from '@/types/result';
import type { Student } from '@/types/student';

type ResultFormProps = { result?: Result };

const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10';

export default function ResultForm({ result }: ResultFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(result);
  const [students, setStudents] = useState<Student[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [studentId, setStudentId] = useState(result?.studentId.toString() ?? '');
  const [examId, setExamId] = useState(result?.examId ?? '');
  const [obtainedMarks, setObtainedMarks] = useState(result?.obtainedMarks.toString() ?? '');
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function loadOptions() {
      try {
        const token = getAuthToken();
        if (!token) throw new Error('Your session has expired. Please log in again.');
        const [studentRows, examRows] = await Promise.all([
          apiRequest<Student[]>('/students', { token }),
          apiRequest<Exam[]>('/exams', { token }),
        ]);
        if (!cancelled) { setStudents(studentRows); setExams(examRows); }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unable to load students and exams.');
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    }
    void loadOptions();
    return () => { cancelled = true; };
  }, []);

  const selectedExam = exams.find((exam) => exam.id === examId);
  const eligibleStudents = useMemo(() => students.filter((student) => selectedExam && student.className === selectedExam.className && student.section === (selectedExam.sections?.[0]?.section ?? selectedExam.section)), [students, selectedExam]);
  const selectedStudent = eligibleStudents.find((student) => student.id === Number(studentId));

  const handleExamChange = (nextExamId: string) => {
    setExamId(nextExamId);
    const exam = exams.find((item) => item.id === nextExamId);
    const currentStudent = students.find((item) => item.id === Number(studentId));
    if (!exam || !currentStudent || currentStudent.className !== exam.className || currentStudent.section !== (exam.sections?.[0]?.section ?? exam.section)) setStudentId('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const token = getAuthToken();
    if (!token) { setError('Your session has expired. Please log in again.'); return; }
    if (!selectedExam || !selectedStudent) { setError('Choose an exam and a student from its class and section.'); return; }
    setSaving(true);
    try {
      const body = { studentId: selectedStudent.id, examId: selectedExam.id, obtainedMarks: Number(obtainedMarks) };
      await apiRequest<Result>(isEditMode ? `/results/${encodeURIComponent(result!.id)}` : '/results', { method: isEditMode ? 'PATCH' : 'POST', token, body: JSON.stringify(body) });
      router.push('/admin/results');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save result.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link href="/admin/results" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796F]"><ArrowLeft size={17} />Back to Results</Link>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? 'Edit Result' : 'Add Result'}
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}
        {loadingOptions ? <div className="py-8 text-center text-sm text-gray-500">Loading exam and student options...</div> : <div className="grid gap-5 sm:grid-cols-2">
          <div><label htmlFor="examId" className="mb-2 block text-sm font-medium text-gray-700">Exam</label><select id="examId" value={examId} onChange={(event) => handleExamChange(event.target.value)} required className={inputClass}><option value="">Select exam</option>{exams.map((exam) => <option key={exam.id} value={exam.id}>{exam.name} — {exam.subject} ({exam.className}-{exam.sections?.[0]?.section ?? exam.section})</option>)}</select></div>
          <div><label htmlFor="studentId" className="mb-2 block text-sm font-medium text-gray-700">Student</label><select id="studentId" value={studentId} onChange={(event) => setStudentId(event.target.value)} required disabled={!selectedExam} className={inputClass}><option value="">{selectedExam ? 'Select student' : 'Select an exam first'}</option>{eligibleStudents.map((student) => <option key={student.id} value={student.id}>{student.name} — Roll {student.rollNo}</option>)}</select></div>
          <div><label className="mb-2 block text-sm font-medium text-gray-700">Class</label><input readOnly value={selectedExam?.className ?? ''} placeholder="Selected from exam" className={`${inputClass} bg-gray-50`} /></div>
          <div><label className="mb-2 block text-sm font-medium text-gray-700">Section</label><input readOnly value={selectedExam?.sections?.[0]?.section ?? selectedExam?.section ?? ''} placeholder="Selected from exam" className={`${inputClass} bg-gray-50`} /></div>
          <div><label className="mb-2 block text-sm font-medium text-gray-700">Subject</label><input readOnly value={selectedExam?.subject ?? ''} placeholder="Selected from exam" className={`${inputClass} bg-gray-50`} /></div>
          <div><label className="mb-2 block text-sm font-medium text-gray-700">Total Marks</label><input readOnly value={selectedExam?.totalMarks ?? ''} placeholder="Selected from exam" className={`${inputClass} bg-gray-50`} /></div>
          <div><label htmlFor="obtainedMarks" className="mb-2 block text-sm font-medium text-gray-700">Obtained Marks</label><input id="obtainedMarks" type="number" min="0" max={selectedExam?.totalMarks} step="1" value={obtainedMarks} onChange={(event) => setObtainedMarks(event.target.value)} placeholder="Enter obtained marks" required className={inputClass} /></div>
        </div>}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || loadingOptions || exams.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Saving...' : isEditMode ? 'Save Changes' : 'Add Result'}
          </button>
        </div>
      </form>
    </div>
  );
}
