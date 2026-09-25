export type TeacherStudyMaterial = {
  id: number;
  title: string;
  subject: string;
  class: string;
  topic: string;
  type: "PDF" | "PPT" | "DOCX" | "Video";
  date: string;
};