export interface Competition {
  _id?: string;          // Primary key from MongoDB
  competitionId?: string; // Virtual key used in our Save logic
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Active' | 'Closed';
}