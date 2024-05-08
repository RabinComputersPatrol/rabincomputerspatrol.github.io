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

// Hebrew letters to English
export const HebrewToEnglishMap: { [key: string]: string } = {
    'א': 'A',
    'ב': 'B',
    'ג': 'G',
    'ד': 'D',
    'ה': 'H',
    'ו': 'V',
    'ז': 'Z',
    'ח': 'Ch',
    'ט': 'T',
    'י': 'Y',
    'כ': 'K',
    'ל': 'L',
    'מ': 'M',
    'נ': 'N',
    'ס': 'S',
    'ע': 'E',
    'פ': 'P',
    'צ': 'Tz',
    'ק': 'Q',
    'ר': 'R',
    'ש': 'Sh',
    'ת': 'T'
};

export const HebrewFinalToEnglishMap: { [key: string]: string } = {
    'ם': 'M',
    'ן': 'N',
    'ץ': 'Ts',
    'ף': 'Ph',
    'ך': 'K'
};

export function convertHebrewToEnglish(hebrewText: string): string {
    return Array.from(hebrewText).map(char => {
        if (char in HebrewToEnglishMap) {
            return HebrewToEnglishMap[char];
        } else if (char in HebrewFinalToEnglishMap) {
            return HebrewFinalToEnglishMap[char];
        } else {
            return char;
        }
    }).join('');
}

export function convertEnglishToHebrew(englishText: string): string {
    const englishToHebrewMap: { [key: string]: string } = {};
    for (const key in HebrewToEnglishMap) {
        if (HebrewToEnglishMap.hasOwnProperty(key)) {
            const value = HebrewToEnglishMap[key];
            englishToHebrewMap[value] = key;
        }
    }
    for (const key in HebrewFinalToEnglishMap) {
        if (HebrewFinalToEnglishMap.hasOwnProperty(key)) {
            const value = HebrewFinalToEnglishMap[key];
            englishToHebrewMap[value] = key;
        }
    }
    
    return Array.from(englishText).map(char => {
        return char in englishToHebrewMap ? englishToHebrewMap[char] : char;
    }).join('');
}

