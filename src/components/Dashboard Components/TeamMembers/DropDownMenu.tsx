import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { useMutation, useQueryClient } from 'react-query';

export interface DropDownMenuProps {
    memberId: string | null;
}

export const DropDownMenu = ({ memberId }: DropDownMenuProps) => {
    const supabase = createClientComponentClient<Database>();
    const queryClient = useQueryClient();

    const deleteMemberMutation = useMutation(
        async (memberId: string) => {
            await supabase.from('subordinates')
                .delete()
                .eq('id', memberId);
        },
        {
            onSuccess: () => {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'User has been deleted.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000
                })
                queryClient.invalidateQueries(['recruitment']);
            },
            onError: () => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000
                })
            },
        }
    );

    const deleteTask = () => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showLoaderOnConfirm: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteMemberMutation.mutate(memberId ?? '');
            }
        });
    }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center outline-none"
                        aria-label="Customise options">
                        <MoreHorizIcon />
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className=" flex flex-col gap-3 min-w-[220px] bg-white rounded-lg p-2 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}>
                        <DropdownMenu.Item className="group text-base leading-none text-[#737373] rounded-[3px] flex items-center h-[25px] px-[5px] relative select-none outline-none">
                            <button onClick={() => {
                                deleteTask()
                            }}>
                                Delete Member{''}
                            </button>
                            <div className="ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
                                <DeleteIcon />
                            </div>
                        </DropdownMenu.Item>
                        <DropdownMenu.Arrow className="fill-white" />
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>
        </>
    );
};