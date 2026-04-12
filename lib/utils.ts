// Utility functions for PRESHOOT app

// Function to get the current date and time in UTC format
export function getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
}

// Function for basic arithmetic calculations
export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}

export function divide(a: number, b: number): number {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
}

// Helper function for formatting numbers
export function formatNumber(num: number, decimals: number = 2): string {
    return num.toFixed(decimals);
}
