const ADMIN_EMAILS = [
  import.meta.env.VITE_ADMIN_EMAIL,
  "alokuc123@gmail.com",
]
  .filter(Boolean)
  .map((email) => email.toLowerCase().trim());

export const isAdminUser = (user) => {
  const email = user?.email?.toLowerCase().trim();
  return Boolean(email && ADMIN_EMAILS.includes(email));
};
