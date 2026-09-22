import { User } from "@/types/user";
import { users as initialUsers } from "@/data/users";

const USERS_KEY = "school-users";

export const getUsers = (): User[] => {
  if (typeof window === "undefined") {
    return initialUsers;
  }

  const storedUsers = localStorage.getItem(USERS_KEY);

  if (!storedUsers) {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(initialUsers)
    );

    return initialUsers;
  }

  try {
    return JSON.parse(storedUsers) as User[];
  } catch {
    return initialUsers;
  }
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

export const addUser = (user: User) => {
  const currentUsers = getUsers();

  saveUsers([
    ...currentUsers,
    user,
  ]);
};
