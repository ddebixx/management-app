import UserDetailsModal from "@/components/UserDetailsModal/UserDetailsModal";

export default function Register() {
    const location = typeof window !== 'undefined' ? window.location : undefined;
    
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <UserDetailsModal  />
            </div>
        </>
    )
}