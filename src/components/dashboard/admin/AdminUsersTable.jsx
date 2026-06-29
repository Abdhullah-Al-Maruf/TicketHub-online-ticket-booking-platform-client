"use client";

import Image from "next/image";
// Cleanly importing the proper compound components from @heroui/react
import {
  Card,
  Table,
  TableContent,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  Label,
} from "@heroui/react";
import {
  FaUserShield,
  FaStore,
  FaExclamationTriangle,
  FaUserCheck,
  FaEllipsisV,
} from "react-icons/fa";
import {
  makeAdmin,
  makeVendor,
  markFraud,
  markUnFraud,
} from "@/lib/action/role-changing";
import toast from "react-hot-toast";

export default function AdminUsersTable({ users = [] }) {
  // Action Handlers
  const onMakeAdmin = async (userId) => {
    const res = await makeAdmin(userId);
    if (res?.success) {
      toast.success("User has been promoted to Admin successfully.");
    } else {
      toast.error(res?.error?.message || "Failed to promote user to Admin.");
    }
  };

  const onMakeVendor = async (userId) => {
    const res = await makeVendor(userId);
    if (res?.success) {
      toast.success("User has been promoted to Vendor successfully.");
    } else {
      toast.error(res?.error?.message || "Failed to promote user to Vendor.");
    }
  };

  const onMarkFraud = async (userId) => {
    const res = await markFraud(userId);
    if (res?.success) {
      toast.success("User has been marked as fraud successfully.");
    } else {
      toast.error(res?.error?.message || "Failed to mark user as fraud.");
    }
  };

  const onRemoveFraud = async (userId) => {
    const res = await markUnFraud(userId);
    if (res?.success) {
      toast.success("User has been marked as Unfraud successfully.");
    } else {
      toast.error(res?.error?.message || "Failed to mark user as ufraud.");
    }
  };

  // Helper component to render the Actions Dropdown
  const ActionDropdown = ({ userId, usr, isUserAdmin, isUserVendor }) => (
    <Dropdown>
      {/* FIX: Dropping the nested <Button> tag inside <Dropdown.Trigger> to clear the nesting error.
        We style a standard semantic division element; HeroUI safely applies click capabilities 
        and turns it into a clean, single HTML button component directly.
      */}
      <Dropdown.Trigger>
        <div 
          role="button"
          tabIndex={0}
          className="flex items-center justify-center text-slate-500 dark:text-slate-400 w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none cursor-pointer"
          aria-label="User actions"
        >
          <FaEllipsisV className="text-sm" />
        </div>
      </Dropdown.Trigger>
      
      <Dropdown.Popover className="bg-white dark:bg-[#1c1a27] border border-black/10 dark:border-white/10 rounded-xl min-w-[160px] shadow-xl">
        <Dropdown.Menu aria-label="User Actions">
          <Dropdown.Item
            id="make-admin"
            isDisabled={isUserAdmin}
            onPress={() => onMakeAdmin(userId)}
            textValue={isUserAdmin ? "Is Admin" : "Make Admin"}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              isUserAdmin ? "text-slate-400" : "text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <FaUserShield className="text-purple-500" />
            <Label>{isUserAdmin ? "Is Admin" : "Make Admin"}</Label>
          </Dropdown.Item>
          
          <Dropdown.Item
            id="make-vendor"
            isDisabled={isUserVendor}
            onPress={() => onMakeVendor(userId)}
            textValue={isUserVendor ? "Is Vendor" : "Make Vendor"}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              isUserVendor ? "text-slate-400" : "text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <FaStore className="text-indigo-500" />
            <Label>{isUserVendor ? "Is Vendor" : "Make Vendor"}</Label>
          </Dropdown.Item>

          {isUserVendor && (
            usr.isFraud ? (
              <Dropdown.Item
                id="remove-fraud"
                onPress={() => onRemoveFraud(userId)}
                textValue="Remove Fraud"
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-green-600 dark:text-green-400 font-medium hover:bg-green-500/10"
              >
                <FaUserCheck className="text-green-500" />
                <Label>Remove Fraud</Label>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                id="mark-fraud"
                onPress={() => onMarkFraud(userId)}
                textValue="Mark as Fraud"
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-red-600 dark:text-red-400 font-medium hover:bg-red-500/10"
              >
                <FaExclamationTriangle className="text-red-500" />
                <Label>Mark as Fraud</Label>
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );

  return (
    <Card className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#12111a] shadow-xl dark:shadow-2xl p-2 sm:p-4 md:p-6 rounded-2xl w-full overflow-hidden">
      
      {/* ─── Mobile & Compact Tablet Card View (Visible below lg: 1024px) ─── */}
      <div className="block lg:hidden space-y-4 p-1">
        {users.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 py-10 text-center font-medium">
            No system users found
          </p>
        ) : (
          users.map((usr) => {
            const userId = usr._id?.$oid || usr._id;
            const lowerRole = usr.role?.toLowerCase();
            const isUserAdmin = lowerRole === "admin";
            const isUserVendor = lowerRole === "vendor";

            return (
              <div
                key={userId}
                className="bg-slate-50 dark:bg-[#1b1924] border border-black/5 dark:border-white/5 rounded-xl p-4 space-y-3 relative overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-purple-500 pl-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex gap-3 items-center min-w-0">
                    <div className="h-10 w-10 relative flex-shrink-0">
                      <Image
                        fill
                        sizes="40px"
                        src={
                          usr.image &&
                          usr.image.trim() !== "" &&
                          (usr.image.startsWith("http") || usr.image.startsWith("/"))
                            ? usr.image
                            : "/profile.png"
                        }
                        className="rounded-full object-cover border border-black/10 dark:border-white/10"
                        alt={`${usr.name || "User"}'s avatar`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="text-slate-900 dark:text-white font-bold text-[15px] flex items-center gap-1.5 flex-wrap">
                        <span className="truncate max-w-[140px] sm:max-w-none">{usr.name || "N/A"}</span>
                        {usr.isFraud && (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[9px] font-bold h-4 uppercase flex-shrink-0"
                          >
                            Fraud
                          </Chip>
                        )}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-xs truncate max-w-[180px] sm:max-w-none mt-0.5">
                        {usr.email}
                      </div>
                    </div>
                  </div>
                  
                  {/* Status Badges & Trigger layout layout on smaller screen targets */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 border-t border-black/5 dark:border-white/5 pt-2 sm:pt-0 sm:border-none">
                    <span className="text-xs text-slate-400 sm:hidden">Role:</span>
                    <div className="flex items-center gap-1">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold uppercase text-[9px] tracking-wider border flex-shrink-0 ${
                          isUserAdmin
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                            : isUserVendor
                              ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                              : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        }`}
                      >
                        {usr.role || "User"}
                      </Chip>
                      <ActionDropdown 
                        userId={userId} 
                        usr={usr} 
                        isUserAdmin={isUserAdmin} 
                        isUserVendor={isUserVendor} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ─── Desktop & Widescreen Table View (Visible from lg: 1024px upwards) ─── */}
      <div className="hidden lg:block w-full overflow-x-auto scrolling-touch">
        <Table
          aria-label="Admin Manage Users Table"
          className="min-w-[900px] w-full text-left border-collapse"
          removeWrapper
        >
          <TableContent>
            <TableHeader className="bg-slate-50 dark:bg-slate-950/40 border-b border-black/10 dark:border-white/5">
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent w-[80px]">
                AVATAR
              </TableColumn>
              <TableColumn
                isRowHeader
                className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent"
              >
                USER DETAILS
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent">
                EMAIL
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent">
                ROLE
              </TableColumn>
              <TableColumn className="py-4 px-6 text-slate-500 dark:text-slate-400 font-extrabold uppercase text-[11px] tracking-wider bg-transparent text-right pr-8 w-[100px]">
                ACTIONS
              </TableColumn>
            </TableHeader>

            <TableBody
              emptyContent={
                <p className="text-slate-400 dark:text-slate-500 py-10 text-center font-medium">
                  No system users found
                </p>
              }
            >
              {users.map((usr) => {
                const userId = usr._id?.$oid || usr._id;
                const lowerRole = usr.role?.toLowerCase();
                const isUserAdmin = lowerRole === "admin";
                const isUserVendor = lowerRole === "vendor";

                return (
                  <TableRow
                    key={userId}
                    className="border-b border-black/5 dark:border-white/5 hover:bg-black/1 dark:hover:bg-white/5 transition-colors duration-150 last:border-b-0"
                  >
                    {/* Avatar Column */}
                    <TableCell className="py-4 px-6 align-middle">
                      <div className="h-10 w-10 relative">
                        <Image
                          fill
                          src={
                            usr.image &&
                            usr.image.trim() !== "" &&
                            (usr.image.startsWith("http") || usr.image.startsWith("/"))
                              ? usr.image
                              : "/profile.png"
                        }
                        className="rounded-full object-cover border border-black/10 dark:border-white/10"
                        alt={`${usr.name || "User"}'s avatar`}
                        />
                      </div>
                    </TableCell>

                    {/* Name Column */}
                    <TableCell className="py-4 px-6 align-middle">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white text-[15px] flex items-center gap-2">
                          {usr.name || "N/A"}
                          {usr.isFraud && (
                            <Chip
                              size="sm"
                              variant="flat"
                              className="bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] font-bold h-5 uppercase"
                            >
                              Fraud Flagged
                            </Chip>
                          )}
                        </span>
                      </div>
                    </TableCell>

                    {/* Email Column */}
                    <TableCell className="py-4 px-6 align-middle text-slate-600 dark:text-slate-300 font-medium">
                      {usr.email}
                    </TableCell>

                    {/* Dynamic Role Badges */}
                    <TableCell className="py-4 px-6 align-middle">
                      <Chip
                        size="sm"
                        variant="flat"
                        className={`font-bold uppercase text-[10px] tracking-wider border px-2.5 py-1 ${
                          isUserAdmin
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                            : isUserVendor
                              ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
                              : "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                        }`}
                      >
                        {usr.role || "User"}
                      </Chip>
                    </TableCell>

                    {/* Action Dropdown Column */}
                    <TableCell className="py-4 px-6 align-middle text-right pr-8">
                      <ActionDropdown 
                        userId={userId} 
                        usr={usr} 
                        isUserAdmin={isUserAdmin} 
                        isUserVendor={isUserVendor} 
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </TableContent>
        </Table>
      </div>
    </Card>
  );
}