export default function Page() {
  return <div>Coming soon</div>;
}


// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   CalendarDays,
//   ClipboardCheck,
//   Pencil,
//   Plus,
//   Search,
//   Trash2,
//   UserRound,
// } from "lucide-react";

// import { exams } from "@/data/exams";

// const statusStyles = {
//   Upcoming: "bg-blue-50 text-blue-700",
//   Completed: "bg-green-50 text-green-700",
// };

// export default function ExamTable() {
//   const [examList, setExamList] = useState(exams);
//   const [search, setSearch] = useState("");

//   const filteredExams = examList.filter((exam) =>
//     [
//       exam.name,
//       exam.subject,
//       exam.className,
//       exam.teacher,
//       exam.status,
//     ]
//       .join(" ")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const handleDelete = (id: string) => {
//     const exam = examList.find((exam) => exam.id === id);

//     if (!exam) return;

//     const confirmed = window.confirm(
//       `Are you sure you want to delete ${exam.name}?`
//     );

//     if (!confirmed) return;

//     setExamList((currentExams) =>
//       currentExams.filter((exam) => exam.id !== id)
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
//           <p className="mt-1 text-sm text-gray-500">
//             Manage examinations and assessment schedules.
//           </p>
//         </div>

//         <Link
//           href="/dashboard/exams/add"
//           className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#01796F] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
//         >
//           <Plus size={18} />
//           Add Exam
//         </Link>
//       </div>

//       {/* Search */}
//       <div className="relative">
//         <Search
//           size={18}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//         />

//         <input
//           type="text"
//           placeholder="Search exams..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
//         />
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[950px]">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Exam
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Subject
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Class
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Teacher
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Exam Date
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Marks
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredExams.map((exam) => (
//                 <tr
//                   key={exam.id}
//                   className="border-b border-gray-100 last:border-0"
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
//                         <ClipboardCheck size={18} />
//                       </div>

//                       <div>
//                         <p className="font-medium text-gray-900">
//                           {exam.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           {exam.id}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {exam.subject}
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {exam.className}
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     {exam.teacher}
//                   </td>

//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2 text-sm text-gray-600">
//                       <CalendarDays size={15} className="text-[#01796F]" />
//                       {exam.examDate}
//                     </div>
//                   </td>

//                   <td className="px-6 py-4 text-sm font-medium text-gray-700">
//                     {exam.totalMarks}
//                   </td>

//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusStyles[exam.status]}`}
//                     >
//                       {exam.status}
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td className="px-6 py-4">
//                     <div className="flex items-center justify-center gap-2">
//                       <Link
//                         href={`/dashboard/exams/${exam.id}`}
//                         title="View"
//                         className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
//                       >
//                         <UserRound size={17} />
//                       </Link>

//                       <Link
//                         href={`/dashboard/exams/${exam.id}/edit`}
//                         title="Edit"
//                         className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
//                       >
//                         <Pencil size={17} />
//                       </Link>

//                       <button
//                         type="button"
//                         title="Delete"
//                         onClick={() => handleDelete(exam.id)}
//                         className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
//                       >
//                         <Trash2 size={17} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Cards */}
//       <div className="space-y-4 md:hidden">
//         {filteredExams.map((exam) => (
//           <div
//             key={exam.id}
//             className="rounded-2xl border border-gray-200 bg-white p-5"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
//                   <ClipboardCheck size={18} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-900">
//                     {exam.name}
//                   </h3>
//                   <p className="text-xs text-gray-500">{exam.id}</p>
//                 </div>
//               </div>

//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[exam.status]}`}
//               >
//                 {exam.status}
//               </span>
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
//               <div>
//                 <p className="text-xs text-gray-400">Subject</p>
//                 <p className="mt-1 font-medium text-gray-700">
//                   {exam.subject}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Class</p>
//                 <p className="mt-1 font-medium text-gray-700">
//                   {exam.className}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Teacher</p>
//                 <p className="mt-1 font-medium text-gray-700">
//                   {exam.teacher}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Exam Date</p>
//                 <p className="mt-1 font-medium text-gray-700">
//                   {exam.examDate}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs text-gray-400">Total Marks</p>
//                 <p className="mt-1 font-medium text-gray-700">
//                   {exam.totalMarks}
//                 </p>
//               </div>
//             </div>

//             {/* Mobile Actions */}
//             <div className="mt-5 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
//               <Link
//                 href={`/dashboard/exams/${exam.id}`}
//                 title="View"
//                 className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
//               >
//                 <UserRound size={17} />
//               </Link>

//               <Link
//                 href={`/dashboard/exams/${exam.id}/edit`}
//                 title="Edit"
//                 className="rounded-lg p-2 text-gray-500 transition hover:bg-[#01796F]/10 hover:text-[#01796F]"
//               >
//                 <Pencil size={17} />
//               </Link>

//               <button
//                 type="button"
//                 title="Delete"
//                 onClick={() => handleDelete(exam.id)}
//                 className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
//               >
//                 <Trash2 size={17} />
//               </button>
//             </div>
//           </div>
//         ))}

//         {filteredExams.length === 0 && (
//           <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
//             No exams found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }