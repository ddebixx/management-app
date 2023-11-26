"use client"

import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate } from 'slate-react'
import { BaseEditor, Editor, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Element } from './Element'
import { Leaf } from './Leaf'

const HOTKEYS = {
    'cmd+b': 'bold',
    'cmd+i': 'italic',
    'cmd+u': 'underline',
    'cmd+c': 'code',
}

interface ButtonProps {
    active: string;
}

type HotkeyFormat = typeof HOTKEYS[keyof typeof HOTKEYS];

const isMarkActive = (editor: BaseEditor, format: HotkeyFormat) => {
    const marks = Editor.marks(editor) as Record<string, boolean> | null;
    return marks ? marks[format] === true : false;
};

const Button = React.forwardRef(({ active, ...children }: ButtonProps) => (
    <span
        {...children}
        className={`${active && 'font-bold'} cursor-pointer mr-3 p-1`}
    />
))

const initialValue = [
    {
        type: 'paragraph',
        children: [
            { text: "" }
        ],
    },
]

export const TextEditor = () => {
    const [value, setValue] = useState(initialValue)
    const renderElement = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [currentMark, setCurrentMark] = useState(null)

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

        return (
            <Button
                active={isMarkActive(editor, format)}
                onMouseDown={(event: { preventDefault: () => void }) => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
            />
        );
    };

    return (
        <Slate editor={editor} initialValue={value} onChange={(value) => setValue(initialValue)}>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg p-2 bg-gray-50 flex items-center justify-between">
                <div className="">
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
                className="mt-4"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
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
                            const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]; // Type assertion here
                            toggleMark(editor, mark);
                            setCurrentMark(mark as any);
                        }
                    }
                }}
            />
        </Slate>
    )
}