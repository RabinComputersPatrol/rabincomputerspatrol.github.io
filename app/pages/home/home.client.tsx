"use client"
import { useRouter } from 'next/navigation';

export default function HomeClient() {
    const router = useRouter();

    const buttonStyle = {
        margin: '10px auto', // Adjust margin as needed
        display: 'block',
        width: '150px', // Adjust width as needed
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    };

    const handleButtonClick = (route: string) => {
        router.push(route);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button style={buttonStyle} onClick={() => handleButtonClick('/pages/support')}>
                טופס חדש
            </button>
            <button style={buttonStyle} onClick={() => handleButtonClick('/pages/login')}>
                צפיה בטפסים קודמים / התחברות
            </button>
        </div>
    );
}
