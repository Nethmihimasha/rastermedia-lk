import { getServerSession } from 'next-auth';

/**
 * This project uses a single CredentialsProvider admin login.
 * Any authenticated session is treated as admin.
 */
export async function getAdminSession() {
  return getServerSession();
}

