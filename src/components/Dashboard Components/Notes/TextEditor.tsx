// "use client"

// import { useMemo, useState } from "react";
// import { Editable, ReactEditor, Slate, withReact } from "slate-react";
// import { createEditor, Node, Transforms } from "slate";

// export const Editor = () => {
//     function withMyPlugin(editor: ReactEditor) {
//         const { insertText, insertData, normalizeNode } = editor;

//         editor.insertText = (text) => {
//             insertText(text);
//         };

//         editor.insertData = (data) => {
//             insertData(data);
//         };

//         editor.normalizeNode = (entry) => {
//             normalizeNode(entry);
//         };



//         return editor;
//     }

//     const editor = useMemo(() => withReact(withMyPlugin(withReact(createEditor()))), []);
//     const [value] = useState<Node[]>([
//         {
//             children: [{ text: "" }],
//         },
//     ]);

//     return (
//         <>
//             <Slate
//                 editor={editor}
//                 initialValue={value}>
//                 <Editable
//                     placeholder="Print your note..."
//                     spellCheck
//                     autoFocus
//                 />
//             </Slate>
//         </>
//     );
// };

"use client"

import React, { ReactNode, useCallback, useMemo } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
    Editor,
    Transforms,
    createEditor,
    Descendant,
    Element as SlateElement,
    BaseEditor,
} from 'slate'
import { withHistory } from 'slate-history'
import { Button, Toolbar } from './Components'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

const HOTKEYS: { [key: string]: string } = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

export const TextEditor = () => {
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const renderElement = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; element: any }) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: React.JSX.IntrinsicAttributes & { attributes: any; children: any; leaf: any }) => <Leaf {...props} />, [])

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Toolbar>
                <MarkButton format="bold">
                    <FormatBoldIcon />
                </MarkButton>
                <MarkButton format="italic">
                    <FormatItalicIcon />
                </MarkButton>
                <MarkButton format="underline">
                    <FormatUnderlinedIcon />
                </MarkButton>
                <MarkButton format="code">
                    <CodeIcon />
                </MarkButton>
                <BlockButton format="heading-one">
                    <CodeIcon />
                </BlockButton>
                <BlockButton format="heading-two">
                    <CodeIcon />
                </BlockButton>
                <BlockButton format="block-quote">
                    <FormatQuoteIcon />
                </BlockButton>
                <BlockButton format="numbered-list">
                    <FormatListNumberedIcon />
                </BlockButton>
                <BlockButton format="bulleted-list">
                    <FormatListBulletedIcon />
                </BlockButton>
                <BlockButton format="left">
                    <FormatAlignLeftIcon />
                </BlockButton>
                <BlockButton format="center">
                    <FormatAlignCenterIcon />
                </BlockButton>
                <BlockButton format="right">
                    <FormatAlignRightIcon />
                </BlockButton>
                <BlockButton format="justify">
                    <FormatAlignJustifyIcon />
                </BlockButton>
            </Toolbar>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck
                autoFocus
                onKeyDown={event => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
        match: n =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            LIST_TYPES.includes(n.type) &&
            !TEXT_ALIGN_TYPES.includes(format),
        split: true,
    })
    let newProperties: Partial<SlateElement>
    if (TEXT_ALIGN_TYPES.includes(format)) {
        newProperties = {
            align: isActive ? undefined : format,
        }
    } else {
        newProperties = {
            type: isActive ? 'paragraph' : isList ? 'list-item' : format,
        }
    }
    Transforms.setNodes<SlateElement>(editor, newProperties)

    if (!isActive && isList) {
        const block = { type: format, children: [] }
        Transforms.wrapNodes(editor, block)
    }
}

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isBlockActive = (editor, format, blockType = 'type') => {
    const { selection } = editor
    if (!selection) return false

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: n =>
                !Editor.isEditor(n) &&
                SlateElement.isElement(n) &&
                n[blockType] === format,
        })
    )

    return !!match
}

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
}

const MarkButton = ({ format, children }) => {
    const editor = useSlate()

    return (
        <Button
            active={isMarkActive(editor, format)}
            onMouseDown={(event: { preventDefault: () => void }) => {
                event.preventDefault()
                toggleMark(editor, format)
            }}
        >
            {children}
        </Button>
    )
}

const BlockButton = ({ format, children }) => {
    const editor = useSlate()
    return (
        <Button
            active={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onMouseDown={(event: { preventDefault: () => void }) => {
                event.preventDefault()
                toggleBlock(editor, format)
            }}
        >
            {children}
        </Button>
    )
}

const initialValue: Descendant[] = [
    {
        children: [
            { text: 'This is editable ' },
            { text: ' text, ' },
            { text: ' better than a ' },
            { text: '!' },
        ],
    },
    {
        children: [
            {
                text: "Since it's rich text, you can do things like turn a selection of text ",
            },

            {
                text: ', or add a semantically rendered block quote in the middle of the page, like this:',
            },
        ],
    },
    {
        children: [{ text: 'A wise quote.' }],
    },
    {

        children: [{ text: 'Try it out for yourself!' }],
    },
]