export type ParentChildDashboard = {
  childName: string;
  className: string;
  section: string;
  rollNo: string;

  attendance: {
    present: number;
    absent: number;
    late: number;
    leave: number;
    percentage: number;
  };

  assignments: {
    pending: number;
    submitted: number;
    overdue: number;
  };

  results: {
    average: number;
    grade: string;
    position: number;
  };

  fees: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
  };

  upcomingExams: number;
};
