import { requireRole } from "@/lib/core/session";


const AdminLayout = async ({children}) => {

    await requireRole("admin")

    return (
        <div>
            {children}
        </div>
    );
};

export default AdminLayout;