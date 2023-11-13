// "use client"

// import { Database } from "@/types/supabase";
// import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { useCallback, useEffect, useState } from "react";

// type Hours = Database["public"]["Tables"]["hours"]["Row"]

// export const useGetAllHours = ({ session }: { session: Session | null }) => {
//     const supabase = createClientComponentClient<Database>();
//     // const [title, setTitle] = useState<Hours>()
//     // const [startTime, setStartTime] = useState<Hours>()
//     // const [endTime, setEndTime] = useState<Hours>()
//     // const [userId, setUserId] = useState<Hours>()
//     // const [id, setId] = useState<Hours>()
//     const [isData, setIsData] = useState<Hours[]>([])
//     const [loading, setLoading] = useState(true);
//     const user = session?.user;

//     const getHours = useCallback(async () => {
//         try {
//             setLoading(true)

//             const { data, error, status } = await supabase
//                 .from('hours')
//                 .select('*')
//                 .eq('userId', user?.id as string)

//             if (error && status !== 406) {
//                 throw error
//             }

//             if (data) {
//                 // setId(data)
//                 // setTitle(data.title)
//                 // setStartTime(data.startTime)
//                 // setEndTime(data.endTime)
//                 // setUserId(data.userId)
//                 setIsData(data)
//             }
//         } catch (error) {
//             alert('Error loading user data!')
//         } finally {
//             setLoading(false)
//         }
//     }, [user, supabase])

//     console.log(session)
//     console.log(isData)
//     console.log(user?.id)

//     useEffect(() => {
//         getHours()
//     }, [getHours, user])

//     return {
//         loading,
//         // title,
//         // startTime,
//         // endTime,
//         // userId,
//         // id,
//         isData
//     }
// }