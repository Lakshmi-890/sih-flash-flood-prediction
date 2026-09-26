/**
 * Utility functions for formatting numbers, percentages, dates, and units.
 */

export function formatPercentage(val) {
  if (val === null || val === undefined) return '0.00%';
  const num = typeof val === 'string' ? parseFloat(val) : val;
  // If value is between 0 and 1, convert to percentage 0-100
  const percentage = num <= 1.0 ? num * 100 : num;
  return `${percentage.toFixed(2)}%`;
}

export function formatDecimal(val, decimals = 4) {
  if (val === null || val === undefined) return '0.0000';
  const num = typeof val === 'string' ? parseFloat(val) : val;
  return num.toFixed(decimals);
}

export function formatDateTime(isoString) {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  } catch (e) {
    return isoString;
  }
}
