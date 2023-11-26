// import React, { ReactNode, Ref, PropsWithChildren } from 'react'
// import ReactDOM from 'react-dom'

// interface BaseProps {
//   className: string
//   [key: string]: unknown
// }
// type OrNull<T> = T | null

// export const Button = React.forwardRef(
//   (
//     {
//       className,
//       active,
//       reversed,
//       ...props
//     }: PropsWithChildren<
//       {
//         active: boolean
//         reversed: boolean
//       } & BaseProps
//     >,
//     ref: Ref<OrNull<HTMLSpanElement>>
//   ) => (
//     <span
//       {...props}
//       ref={ref as React.RefObject<HTMLSpanElement>}
//       className={className}
//     />
//   )
// )

// export const EditorValue = React.forwardRef(
//     (
//       {
//         className,
//         value,
//         ...props
//       }: PropsWithChildren<
//         {
//           value: any
//         } & BaseProps
//       >,
//       ref: Ref<OrNull<null>>
//     ) => {
//       const textLines = value.document.nodes
//         .map((node: { text: any }) => node.text)
//         .toArray()
//         .join('\n')
//       return (
//         <div
//           ref={ref as null}
//           {...props}
//           className={className}
//         >
//           <div
//             className={""}
//           >
//             Slate's value as text
//           </div>
//           <div
//             className={""}
//           >
//             {textLines}
//           </div>
//         </div>
//       )
//     }
//   )

//   export const Icon = React.forwardRef(
//     (
//       { className, ...props }: PropsWithChildren<BaseProps>,
//       ref: Ref<OrNull<HTMLSpanElement>>
//     ) => (
//       <span
//         {...props}
//         ref={ref as React.RefObject<HTMLSpanElement>}
//         className="text-lg text-center"
//       />
//     )
//   )

//   export const Instruction = React.forwardRef(
//     (
//       { className, ...props }: PropsWithChildren<BaseProps>,
//       ref: Ref<OrNull<HTMLDivElement>>
//     ) => (
//       <div
//         {...props}
//         ref={ref as React.RefObject<HTMLDivElement>}
//         className={""}
//       />
//     )
//   )

//   export const Menu = React.forwardRef(
//     (
//       { className, ...props }: PropsWithChildren<BaseProps>,
//       ref: Ref<OrNull<HTMLDivElement>>
//     ) => (
//       <div
//         {...props}
//         data-test-id="menu"
//         ref={ref as React.RefObject<HTMLDivElement>}
//         className={"flex gap-4 p-2"}
//       />
//     )
//   )

//   export const Portal = ({ children }: { children?: ReactNode }) => {
//     return typeof document === 'object'
//       ? ReactDOM.createPortal(children, document.body)
//       : null
//   }
  

//   export const Toolbar = React.forwardRef(
//     (
//       { className, ...props }: PropsWithChildren<BaseProps>,
//       ref: Ref<OrNull<HTMLDivElement>>
//     ) => (
//       <Menu
//         {...props}
//         ref={ref as React.RefObject<HTMLDivElement>}
//         className={"bg-black"}
//       />
//     )
//   )


