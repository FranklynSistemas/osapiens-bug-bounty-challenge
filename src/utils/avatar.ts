import { User } from "../api/services/User/store";

export const getInitials = (user: User) => {
  if (user.firstName || user.lastName) {
    const initials = [user.firstName, user.lastName]
      .map((_) => (_?.[0] ? _?.[0]?.toLocaleUpperCase() : _?.[0]))
      .join("") ?? "";
    return initials;
  }
  return "";
};

export const stringAvatar = (user: User) => {
  const initials = getInitials(user);
  // 36 * 7 <= 255
  const r = Math.floor(parseInt(initials[0] ? initials[0] : "k", 36) * 7);
  const g = Math.floor(parseInt(initials[1] ? initials[1] : "l", 36) * 7);
  const b = Math.floor(
    parseInt(user?.firstName?.[1] ? user?.firstName?.[1] : "m", 36) * 7
  );
  return {
    sx: { bgcolor: `rgb(${r},${g},${b})`, cursor: "pointer" },
    children: initials
  };
};
