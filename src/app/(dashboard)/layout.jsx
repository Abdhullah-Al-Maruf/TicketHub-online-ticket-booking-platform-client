import { getUserSession } from "@/lib/core/session";
import DashboardLayoutClient from "./dashboard/DashboardLayoutClient";


export default async function DashboardLayout({ children }) {
  // Safe Server-Side invocation of next/headers inside the App Router hierarchy
  const user = await getUserSession();

  return (
    <DashboardLayoutClient user={user}>
      {children}
    </DashboardLayoutClient>
  );
}