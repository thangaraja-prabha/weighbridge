// Indian mobile number validation for frontend
export function validateIndianMobileNumber(mobile: string): boolean {
    if (!mobile) return false;
    
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '');
    
    // Check if it starts with +91, remove it for validation
    let numberToValidate = cleanMobile;
    if (cleanMobile.startsWith('91') && cleanMobile.length === 12) {
        numberToValidate = cleanMobile.slice(2);
    }
    
    // Indian mobile numbers are 10 digits long
    // Starting with 6, 7, 8, or 9
    const indianMobileRegex = /^[6-9]\d{9}$/;
    
    return indianMobileRegex.test(numberToValidate);
}

// Format mobile number with +91 prefix
export function formatMobileNumber(mobile: string): string {
    if (!mobile) return '+91 ';
    
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '');
    
    // Check if it starts with 91 (country code)
    if (cleanMobile.startsWith('91') && cleanMobile.length === 12) {
        return '+91 ' + cleanMobile.slice(2);
    }
    
    // If it's a 10-digit number, add +91 prefix
    if (cleanMobile.length === 10 && validateIndianMobileNumber(cleanMobile)) {
        return '+91 ' + cleanMobile;
    }
    
    // Return original if not valid
    return mobile;
}

// Extract 10-digit number from formatted mobile
export function extractMobileNumber(mobile: string): string {
    if (!mobile) return '';
    
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '');
    
    // If it starts with 91, remove the country code
    if (cleanMobile.startsWith('91') && cleanMobile.length === 12) {
        return cleanMobile.slice(2);
    }
    
    // Return last 10 digits if longer
    return cleanMobile.slice(-10);
}

// Get validation error message
export function getMobileValidationError(mobile: string): string | null {
    if (!mobile || mobile.trim() === '') {
        return 'Mobile number is required';
    }
    
    if (!validateIndianMobileNumber(mobile)) {
        return 'Please enter a valid Indian mobile number (10 digits starting with 6, 7, 8, or 9)';
    }
    
    return null; // Valid
}

// Mobile input component props
export interface MobileInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    error?: string | null;
}

// Handle mobile input change with formatting
export function handleMobileInputChange(value: string, onChange: (value: string) => void): void {
    // Add +91 prefix if not present and user starts typing digits
    if (value && !value.startsWith('+91') && /^\d/.test(value)) {
        value = '+91 ' + value;
    }
    
    // Format the number
    const formatted = formatMobileNumber(value);
    onChange(formatted);
}
