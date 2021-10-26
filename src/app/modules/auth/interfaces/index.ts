import { UserEntity } from '../../../entities';

export interface LogInResponse {
  user: UserEntity;
  idToken: string;
}
