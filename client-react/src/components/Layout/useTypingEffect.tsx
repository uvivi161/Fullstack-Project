import { useEffect, useState } from "react";

function useTypingEffect(text: string, quick: number, wait: number, pause: number) {
    const [writen, setWriten] = useState("");
    const [letter, setLetter] = useState(0);
    const [isWaiting, setIsWaiting] = useState(false); // האם מחכים לפני מחיקה

    useEffect(() => {
        if (letter < text.length) {
            const timer = setTimeout(() => {
                setWriten((prev) => prev + text[letter]);
                setLetter(letter + 1);
            }, quick);
            return () => clearTimeout(timer);
        } 
        
        // כשהגענו לסוף הטקסט, מחכים לפני מחיקה
        if (letter === text.length && !isWaiting) {
            setIsWaiting(true);
            const pauseTimer = setTimeout(() => {
                setIsWaiting(false); // מסמן שאפשר למחוק
            }, pause);
            return () => clearTimeout(pauseTimer);
        }

        // אחרי שההשהיה נגמרת - מוחקים ומתחילים מחדש
        if (isWaiting) {
            const resetTimer = setTimeout(() => {
                setWriten("");
                setLetter(0);
            }, wait);
            return () => clearTimeout(resetTimer);
        }

    }, [letter, text, quick, wait, pause, isWaiting]);

    return writen;
}

export default useTypingEffect;
