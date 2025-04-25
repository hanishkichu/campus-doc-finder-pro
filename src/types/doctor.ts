
export interface Doctor {
  id: string;
  name: string;
  specialty?: string[];
  qualification?: string;
  experience: number;
  clinic: string;
  location: string;
  fee: number;
  consultationType?: string[];
  rating?: number;
  profilePic?: string;
}
