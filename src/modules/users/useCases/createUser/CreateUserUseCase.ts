import { response } from "express";

import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User | Error {
    const userExists = this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Email already in use");
    }

    return this.usersRepository.create({ email, name });
  }
}

export { CreateUserUseCase };
