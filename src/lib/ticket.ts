/**
 * Generate a unique ticket ID
 * Format: TKT-YYYYMMDDXXX (e.g., TKT-20251112001)
 * XXX = counter that increments per day
 */

// Store counter in memory (resets on server restart)
// In production, you'd store this in a database
const ticketCounters: { [key: string]: number } = {};

export function generateTicketId(): string {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0].replace(/-/g, ''); // YYYYMMDD
  
  // Get or initialize counter for today
  if (!ticketCounters[dateStr]) {
    ticketCounters[dateStr] = 0;
  }
  
  // Increment counter
  ticketCounters[dateStr]++;
  const counter = String(ticketCounters[dateStr]).padStart(3, '0'); // 001, 002, 003...
  
  return `TKT-${dateStr}${counter}`;
}

/**
 * Format date for ticket display
 * Input: "2025-11-12T14:30:00Z"
 * Output: "12 Nov 2025, 2:30 PM"
 */
export function formatTicketDateTime(isoString: string): { date: string; time: string } {
  const date = new Date(isoString);
  
  const dateStr = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  return { date: dateStr, time: timeStr };
}
