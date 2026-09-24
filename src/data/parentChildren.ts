export type ParentChild = {
  id: number;
  name: string;
  parentId: number;
  className: string;
};

export const parentChildren: ParentChild[] = [
  {
    id: 1,
    name: "Ali Asif",
    parentId: 1,
    className: "Grade 8 - A",
  },
  {
    id: 2,
    name: "Hassan Asif",
    parentId: 1,
    className: "Grade 6 - B",
  },
  {
    id: 3,
    name: "Hamza Ahmad",
    parentId: 2,
    className: "Grade 7 - A",
  },
  {
    id: 4,
    name: "Ayesha Sajid",
    parentId: 3,
    className: "Grade 5 - A",
  },
  {
    id: 5,
    name: "Fatima Sajid",
    parentId: 3,
    className: "Grade 8 - B",
  },
  {
    id: 6,
    name: "Usman Imran",
    parentId: 4,
    className: "Grade 6 - A",
  },
  {
    id: 7,
    name: "Zain Bilal",
    parentId: 5,
    className: "Grade 9 - A",
  },
  {
    id: 8,
    name: "Hira Bilal",
    parentId: 5,
    className: "Grade 5 - B",
  },
  {
    id: 9,
    name: "Abdullah Kashif",
    parentId: 6,
    className: "Grade 7 - B",
  },
  {
    id: 10,
    name: "Maryam Tariq",
    parentId: 7,
    className: "Grade 9 - B",
  },
  {
    id: 11,
    name: "Maria Tariq",
    parentId: 7,
    className: "Grade 6 - A",
  },
  {
    id: 12,
    name: "Ahmad Faisal",
    parentId: 8,
    className: "Grade 10 - A",
  },
];
