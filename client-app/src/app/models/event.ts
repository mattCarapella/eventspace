export interface Event {
  id: string;
  name: string;
  date: Date | null;
  description: string;
  cost: number | null;
  ticketLink: string;
  category: string;
  // likes: number;
  genre: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  // createdAt: string;
  // updatedAt: string;
}