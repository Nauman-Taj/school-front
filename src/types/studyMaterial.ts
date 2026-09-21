export type StudyMaterial = {
  id: number;
  title: string;
  subject: string;
  className: string;
  type: "PDF" | "Document" | "Video" | "Notes";
  teacher: string;
  date: string;
  description: string;
};