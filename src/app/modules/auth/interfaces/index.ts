import { UserEntity } from '../../../entities';

export interface LogInResponse {
  user: UserEntity;
  token: string;
}

export interface LoginJwtPayload {
  id: string;
  sub: string;
}
