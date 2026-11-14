// Accounts that may sign in to the dashboard. These rows are seeded into the
// `admin_users` table; after the first migration, access is managed in the
// database (Dashboard → Access) rather than through environment variables.
export const defaultAdmins = [
  { email: 'info@odhiambolvis.tech', name: 'Elvis Odhiambo' },
];
