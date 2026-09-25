export type StudyMaterial = {
  id: number;
  title: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  type: "PDF" | "Document" | "Video" | "Notes";
  date: string;
  description: string;
};