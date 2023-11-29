"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight, Search } from "@mui/icons-material";
import { DropDownMenu } from "./DropDownMenu";
import EditTaskModal from "./EditTaskModal";

type Tasks = Database["public"]["Tables"]["tasks"]["Row"]

export const TasksTable = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Tasks[]>([])
    const [role, setRole] = useState<string | null>(null)
    const [taskToEdit, setTaskToEdit] = useState<any | null>(null)
    const [loading, setLoading] = useState(true);
    const user = session?.user;
    const columnHelper = createColumnHelper();
    const [globalFilter, setGlobalFilter] = useState("");
    const getUserRole = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("users")
                .select("role")
                .eq("id", user?.id as string)
                .single();

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setRole(data.role);
            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    const getTasks = useCallback(async () => {
        try {
            setLoading(true);

            let query = supabase.from("tasks").select("*");

            if (role === "Project manager") {
                query = query.eq("assigned_manager", user?.id as string);
            } else {
                query = query.eq("assigned_worker", user?.id as string);
            }

            const { data, error, status } = await query;

            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setIsData(data);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [user, supabase, role]);

    useEffect(() => {
        getUserRole();
    }, [getUserRole, user]);

    useEffect(() => {
        if (role) {
            getTasks();
        }
    }, [getTasks, role, user]);
    const generateColumns = (): any[] => {
        if (isData.length === 0) {
            return [];
        } else if (isData.length > 0 && "id" in isData[0]) {
            return [
                columnHelper.accessor("task_name", {
                    header: "Task",
                }),
                columnHelper.accessor("task_description", {
                    header: "Description",
                }),
                columnHelper.accessor("manager_name", {
                    header: "Manager",
                }),
                columnHelper.accessor("worker_name", {
                    header: "Worker",
                }),
                columnHelper.accessor("assignment_date", {
                    header: "Assignment Date",
                }),
                columnHelper.accessor("expiry_date", {
                    header: "Expiry Date",
                }),
                columnHelper.accessor("task_status", {
                    header: "Status",
                }),
                columnHelper.accessor("id", {
                    header: "",
                    cell: (row) => {
                        const taskId = "id" in (row.row.original as any) ? (row.row.original as any).id : null;
                        return (
                            <>
                                {user && (
                                    <DropDownMenu
                                        setTaskToEdit={setTaskToEdit}
                                        taskId={taskId}
                                    />
                                )}
                            </>
                        );
                    }
                }),
            ];
        }

        return [];
    };

    const columns = useMemo(() => generateColumns(), [isData]);

    const table = useReactTable({
        data: isData,
        columns: columns,
        state: {
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel()
    });

    return (
        <>
            <div className="border-[.5px] w-full h-[550px] p-4 rounded-lg flex flex-col items-end gap-4">
                <div className="self-start flex items-center gap-4">
                    <Search />
                    <input className="self-start p-2 outline-none"
                        type="text"
                        placeholder="Search..."
                        value={globalFilter ?? ""}
                        onChange={(e) => table.setGlobalFilter(e.target.value)}
                    />
                </div>
                <table className="w-full">
                    <thead className="border-b-[.5px] p-4">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th className="text-center p-2 text-lg text-[#737373]" key={header.id} scope="col">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="p-8 rounded-full">
                        {table.getRowModel().rows.map((row) => (
                            <tr className="border-b-[.5px] " key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td className="text-center font-normal p-2" key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ul className="pagination flex gap-2">
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}>
                        <ArrowLeft />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <ArrowLeft />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        <ArrowRight />
                    </button>
                </li>
                <li className="page-item">
                    <button
                        className="p-1"
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}>
                        <ArrowRight />
                    </button>
                </li>
                <li className="page-item">
                    <select
                        className="form-select"
                        style={{ width: "150px", marginLeft: "10px" }}
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => {
                            table.setPageSize(Number(e.target.value));
                        }}>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </li>
            </ul>
            <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
            </div>
            {taskToEdit && (
                <EditTaskModal
                    taskToEdit={taskToEdit}
                />
            )}
        </>
    )
}
