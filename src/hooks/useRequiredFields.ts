import { useState, useCallback } from "react";

export function useRequiredFields(requiredFields: string[], initialValues: Record<string, string> = {}) {
    const [fields, setFields] = useState<Record<string, string>>(() => {
        const obj: Record<string, string> = {};
        requiredFields.forEach(f => { obj[f] = initialValues[f] || ""; });
        return obj;
    });
    const [touched, setTouched] = useState<Record<string, boolean>>(() => {
        const obj: Record<string, boolean> = {};
        requiredFields.forEach(f => { obj[f] = false; });
        return obj;
    });

    const isValid = requiredFields.every(f => fields[f]?.trim() !== "");

    const handleChange = useCallback((field: string, value: string) => {
        setFields(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleBlur = useCallback((field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const handleNextAttempt = useCallback(() => {
        setTouched(prev => {
            const allTouched: Record<string, boolean> = {};
            requiredFields.forEach(f => { allTouched[f] = true; });
            return { ...prev, ...allTouched };
        });
    }, [requiredFields]);

    return {
        fields,
        setFields,
        touched,
        setTouched,
        isValid,
        handleChange,
        handleBlur,
        handleNextAttempt,
    };
}
