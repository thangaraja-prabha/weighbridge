// Indian mobile number validation
export function validateIndianMobileNumber(mobile: string): boolean {
    if (!mobile) return false;
    
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '');
    
    // Indian mobile numbers are 10 digits long
    // Starting with 6, 7, 8, or 9
    const indianMobileRegex = /^[6-9]\d{9}$/;
    
    return indianMobileRegex.test(cleanMobile);
}

// Format Indian mobile number for display
export function formatIndianMobileNumber(mobile: string): string {
    if (!mobile) return '';
    
    // Remove all non-digit characters
    const cleanMobile = mobile.replace(/\D/g, '');
    
    // If it's a valid 10-digit Indian number, format it
    if (validateIndianMobileNumber(cleanMobile)) {
        return cleanMobile;
    }
    
    return mobile; // Return original if not valid
}

// Custom Drizzle validation function for Indian mobile numbers
export function indianMobileValidator(mobile: string): string | null {
    if (!mobile) {
        return 'Mobile number is required';
    }
    
    if (!validateIndianMobileNumber(mobile)) {
        return 'Please enter a valid Indian mobile number (10 digits starting with 6, 7, 8, or 9)';
    }
    
    return null; // Valid
}
