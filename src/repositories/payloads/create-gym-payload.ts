export interface CreateGymPayload {
  id?: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
