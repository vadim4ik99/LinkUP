import type { CreateUserResponseDto } from '../dto/create-user-response.dto';

export abstract class UserService {

  /**
   * This method creates a user
   * @param email
   */
  public abstract create(email: string): Promise<CreateUserResponseDto>;

}
