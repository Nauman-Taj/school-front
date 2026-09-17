export default function Page() {
  return <div>Coming soon</div>;
}


// "use client";

// import {
//   Megaphone,
//   Send,
//   FileText,
//   Plus,
// } from "lucide-react";

// import Link from "next/link";
// import { announcements } from "@/data/announcements";
// import AnnouncementTable from "./AnnouncementTable";

// export default function AnnouncementsPage() {
//   const totalAnnouncements = announcements.length;

//   const publishedAnnouncements = announcements.filter(
//     (item) => item.status === "Published"
//   ).length;

//   const draftAnnouncements = announcements.filter(
//     (item) => item.status === "Draft"
//   ).length;

//   const stats = [
//     {
//       title: "Total",
//       value: totalAnnouncements,
//       icon: Megaphone,
//       description: "All announcements",
//     },
//     {
//       title: "Published",
//       value: publishedAnnouncements,
//       icon: Send,
//       description: "Published announcements",
//     },
//     {
//       title: "Drafts",
//       value: draftAnnouncements,
//       icon: FileText,
//       description: "Saved drafts",
//     },
//   ];

//   return (
//     <div className="space-y-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             Announcements
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Manage school announcements and notices.
//           </p>
//         </div>

//         <Link
//           href="/dashboard/announcements/add"
//           className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
//         >
//           <Plus size={17} />
//           Add Announcement
//         </Link>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-3">
//         {stats.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <div
//               key={stat.title}
//               className="rounded-2xl border border-gray-200 bg-white p-5"
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">
//                     {stat.title}
//                   </p>

//                   <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                     {stat.value}
//                   </h2>
//                 </div>

//                 <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
//                   <Icon size={20} />
//                 </div>
//               </div>

//               <p className="mt-3 text-sm text-gray-500">
//                 {stat.description}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       <AnnouncementTable />
//     </div>
//   );
// }