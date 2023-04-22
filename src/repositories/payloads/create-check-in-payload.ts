export interface CreateCheckInPayload {
  user_id: string;
  gym_id: string;
  validated_at?: Date | string | null;
}
