import { redirect } from "next/navigation";

export default function formatDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
   
    return `${dd}/${mm}/${yyyy}`;
};
   
const today = formatDate();
console.log(today);

export function getEmailWithoutProvider(email: string): string | null {
    const parts = email.split('@');
    
    if (parts.length === 2 && parts[0].trim() !== '') {
        return parts[0];
    } else {
        return null;
    }
}