export type AssignmentSubmissionStatus =
  | "Not Submitted"
  | "Submitted"
  | "Checked"
  | "Late";

export type AssignmentSubmission = {
  id: string;
  assignmentId: string;
  studentId: number;
  student: string;
  submittedDate?: string;
  file?: string;
  status: AssignmentSubmissionStatus;
  marks?: number;
  totalMarks: number;
  teacherFeedback?: string;
};