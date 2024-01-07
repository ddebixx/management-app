"use client"

import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useMemo, useState } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { DropDownMenu } from "./DropDownMenu";
import EditTaskModal from "./EditTaskModal";
import { useQuery, useQueryClient } from "react-query";
import { useUserContext } from "@/actions/userContextProvider";
import { Task } from "iconsax-react";
import AssignTasksModal from "./AssignTaskModal";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

type Tasks = Database["public"]["Tables"]["tasks"]["Row"]

export const TasksTable = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [isData, setIsData] = useState<Tasks[]>([])
    const [taskToEdit, setTaskToEdit] = useState<any | null>(null)
    const user = session?.user;
    const columnHelper = createColumnHelper();
    const [globalFilter, setGlobalFilter] = useState("");
    const queryClient = useQueryClient();
    const { userRole, userName } = useUserContext();


    const useTasksQuery = ({ user, supabase, userRole }: any) => {
        return useQuery(['tasks', user?.id, userRole], async () => {
            const { data, error, status } = await supabase
                .from('tasks')
                .select('*')
                .eq(userRole === 'Project manager' ? 'assigned_manager' : 'assigned_worker', user?.id as string);

            if (error && status !== 406) {
                throw error;
            }

            if (data) {

                const currentDate = new Date();
                data.forEach((task: any) => {
                    const expiryDate = new Date(task.expiry_date);
                    if (currentDate > expiryDate) {
                        task.task_status = 'EXPIRED';
                    }
                })

                setIsData(data);
                queryClient.invalidateQueries(['tasks']);
            }

            return data;
        });
    };

    const { data: tasksData, isLoading, isError } = useTasksQuery({ user, supabase, userRole });

    const generateColumns = useCallback((): any[] => {
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
                    cell: (row) => {
                        const status = "task_status" in (row.row.original as any) ? (row.row.original as any).task_status : null;
                        return (
                            <>
                                {status === "COMPLETED" && (
                                    <div className="bg-green-300 rounded-full">
                                        {status}
                                    </div>

                                )} {status === "ACTIVE" && (
                                    <div className="bg-blue-300 rounded-full">
                                        {status}
                                    </div>

                                )} {status === "CANCELED" && (
                                    <div className="bg-red-300 rounded-full">
                                        {status}
                                    </div>

                                )} {status === "EXPIRED" && (
                                    <div className="bg-red-300 rounded-full">
                                        {status}
                                    </div>
                                )}
                            </>
                        );
                    }
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
    }, [isData, columnHelper, user]);

    const columns = useMemo(() => generateColumns(), [generateColumns]);

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
            <div className="p-4 border-[1px] rounded-lg bg-white w-full h-[80vh] overflow-y-auto flex flex-col gap-8">
                <div className="min-[1024px]:hidden relative h-screen flex flex-col items-center justify-center text-violet-600">
                    <Task className="absolute z-0 opacity-10" size={164} />
                    <h1 className="z-[23423423] text-3xl text-center font-bold text-[#404040] w-[85%]">For better user experience switch to PC</h1>
                </div>
                <div className="flex flex-col gap-4">
                    {userName && (
                        <div className="flex flex-col justify-end">
                            <h1 className="text-3xl font-bold truncate min-[768px]:text-4xl">
                                Hello, <span className="bg-clip-text text-transparent bg-gradient-to-b from-violet-600 to-violet-500">{userName}</span>
                            </h1>

                            {isData.length > 0 && (
                                <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">There is your list of tasks!</p>
                            )}

                            {isData.length === 0 && (
                                <p className="text-lg font-semibold text-black/70 min-[768px]:text-xl">No applications yet</p>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between">
                        <input
                            className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                            type="text"
                            placeholder="Search"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <AssignTasksModal session={session} />
                    </div>
                </div>

                <div className="border-[.5px] w-full h-[550px] p-4 rounded-lg flex flex-col items-end gap-4 max-[1024px]:hidden">
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
                <ul className="pagination flex gap-2 max-[1024px]:hidden">
                    <li className="page-item">
                        <button
                            className="border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}>
                            <KeyboardDoubleArrowLeftRoundedIcon className="rotate-180" />
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}>
                            <KeyboardArrowLeftIcon className="rotate-180" />
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                            <KeyboardArrowRightIcon />
                        </button>
                    </li>
                    <li className="page-item">
                        <button
                            className="border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}>
                            <KeyboardDoubleArrowRightRoundedIcon />
                        </button>
                    </li>
                    <li className="page-item">
                        <select
                            className="form-select border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer"
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
                <div className="flex items-center gap-2 max-[1024px]:hidden">
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
                            className="form-select border-[1px] p-2 rounded-lg hover:border-violet-500 transition cursor-pointer w-16"
                        />
                    </span>
                    {taskToEdit && (
                        <EditTaskModal
                            taskToEdit={taskToEdit}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
