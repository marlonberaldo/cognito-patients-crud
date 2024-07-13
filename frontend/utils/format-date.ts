/**
 * Formats an ISO 8601 date string into a readable date format in Brazilian Portuguese.
 * 
 * @param date An ISO 8601 date string (e.g., "2024-02-20T18:19:21.098Z").
 *             The ISO 8601 format includes both date and time, but this function focuses only on the date part.
 * @returns A string representing the formatted date in the "day of month of year" style
 *          using the "pt-BR" locale (e.g., "20 de fevereiro de 2024").
 *          The month is returned as its full name in Brazilian Portuguese.
 */
export function formatDate(date: string): string {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

  return formattedDate;
}