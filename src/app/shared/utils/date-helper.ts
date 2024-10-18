export class DateHelper {
	/**
	 * Convert date to string in format YYYY-MM-DD
	 */
	static parseDate(date: Date): String {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois (1-12)
		const day = String(date.getDate()).padStart(2, '0'); // Jour

		return `${year}-${month}-${day}`; // Format 'YYYY-MM-DD'
	}
}
