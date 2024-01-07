"use client"

import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { BaseEditor, Editor, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Element } from './Element'
import { Leaf } from './Leaf'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useModal } from '@/hooks/useModal'
import { Modal } from '@/components/Modal'
import { NoteAdd } from 'iconsax-react'
import { useUserContext } from '@/actions/userContextProvider'

const HOTKEYS = {
    'cmd+b': 'bold',
    'cmd+i': 'italic',
    'cmd+u': 'underline',
    'cmd+c': 'code',
}

type HotkeyFormat = typeof HOTKEYS[keyof typeof HOTKEYS];

const isMarkActive = (editor: BaseEditor, format: HotkeyFormat) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | null;
    return marks ? marks[format] === true : false;
};

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: "" }
        ],
    },
]

const ElementComponent = (props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => {
    return <Element {...props} />;
};
ElementComponent.displayName = 'ElementComponent';

const LeafComponent = (props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => {
    return <Leaf {...props} />;
};
LeafComponent.displayName = 'LeafComponent';

export const AddNoteModal = () => {
    const supabase = createClientComponentClient<Database>()
    const [title, setTitle] = useState<string | null>(null)
    const [value, setValue] = useState(initialValue)
    const renderElement = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <ElementComponent {...props} />, []);
    const renderLeaf = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <LeafComponent {...props} />, []);
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [currentMark, setCurrentMark] = useState(null)
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onClose } = useModal()
    const { userId } = useUserContext();

    const toggleMark = (editor: BaseEditor, format: string) => {
        const isActive = isMarkActive(editor, format)
        if (isActive) {
            Editor.removeMark(editor, format)
        } else {
            Editor.addMark(editor, format, true)
        }
    }

    const ToolbarButton = ({ format, icon }: { format: string; icon: string }) => {
        interface ButtonProps {
            active: boolean;
            onMouseDown: (event: { preventDefault: () => void }) => void;
        }

        const Button = React.forwardRef(
            ({ active, onMouseDown, ...props }: ButtonProps, ref: React.Ref<HTMLButtonElement>) => (
                <button
                    {...props}
                    ref={ref}
                    className={`${active && 'font-bold'} cursor-pointer mr-3 p-1`}
                    onMouseDown={onMouseDown}
                >
                    {icon}
                </button>
            )
        );
        Button.displayName = 'Button';

        const active = isMarkActive(editor, format);
        const onMouseDown = (event: { preventDefault: () => void }) => {
            event.preventDefault();
            toggleMark(editor, format);
        };

        return <Button active={active} onMouseDown={onMouseDown} />;
    };
    ToolbarButton.displayName = 'ToolbarButton';

    const { mutateAsync: addNote } = useMutation(
        async ({
            title,
            content,
        }: {
            title: string | null | undefined;
            content: string | null | undefined;
            user_id: string | null | undefined;
        }) => {
            await supabase
                .from('notes')
                .insert([
                    {
                        title: title ?? '',
                        content: (content as any) ?? '',
                        user_id: userId ?? '',
                        created_at: new Date() as any,
                    },
                ])
        },
        {
            onSuccess: () => {
                toast.success('Note added successfully!');
                queryClient.invalidateQueries(['notes', userId]);
            },
            onError: (error) => {
                toast.error('Something went wrong!')
                throw error;
            },
        }
    );


    const bodyContent = (
        <div className='flex flex-col gap-4 w-[600px]'>
            <input type="text"
                placeholder="Note title..."
                className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full w-full min-[768px]:w-64"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
            />
            <Slate editor={editor}
                initialValue={value}
                onChange={(value) => setValue(value as any)}>
                <div className="px-4 py-2 outline-none border transition focus:border-violet-300 border-gray-300 rounded-full min-[768px]:w-64">
                    <div>
                        <ToolbarButton format="bold" icon="B" />
                        <ToolbarButton
                            format="italic"
                            icon={"I"}
                        />
                        <ToolbarButton
                            format="underline"
                            icon={"U"}
                        />
                        <ToolbarButton format="code" icon={"< >"} />
                        <ToolbarButton format="heading-one" icon="H1" />
                        <ToolbarButton format="heading-two" icon="H2" />
                    </div>
                </div>
                <Editable
                    className="px-4 py-2 outline-none border border-gray-300 rounded-lg h-64 resize-none overflow-y-scroll "
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            toggleMark(editor, currentMark as any);
                            setCurrentMark(null);
                        }
                        for (const hotkey in HOTKEYS) {
                            if (isHotkey(hotkey, event)) {
                                event.preventDefault();
                                const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                                toggleMark(editor, mark);
                                setCurrentMark(mark as any);
                            }
                        }
                    }}
                />
            </Slate>
            <button
                onClick={
                    () => {
                        addNote({
                            title,
                            content: value as any,
                            user_id: userId
                        })

                        onClose()
                    }
                }
                className="bg-gradient-to-b from-violet-600 to-violet-500 text-white font-bold py-2 px-4 rounded-full hover:opacity-90 transition">
                Add Note
            </button>
        </div>
    )

    return (
        <>
            <div className='relative'>
                <button className='fixed bottom-24 right-4 bg-gradient-to-b from-violet-600 to-violet-500 p-2 rounded-full min-[1024px]:w-fit min-[1024px]:flex min-[1024px]:gap-2 min-[1024px]:relative min-[1024px]:top-0 min-[1024px]:right-0 hover:opacity-90 transition'
                    onClick={onOpen}>
                    <p className='max-[1024px]:hidden text-white font-medium'>Add note</p>
                    <NoteAdd size="24" color="#fff" />
                </button>
                <div className='relative'>
                    <Modal isOpen={isOpen}
                        onClose={onClose}
                        title="Add note"
                        body={bodyContent}
                    />
                </div>
            </div>
        </>
    )
}