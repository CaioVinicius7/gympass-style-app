export interface CheckInDTO {
  id: string;
  created_at: Date;
  validated_at: Date | string | null;
  user_id: string;
  gym_id: string;
}
