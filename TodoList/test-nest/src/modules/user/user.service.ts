import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'
import { User } from './user.entity'
import { IUser } from './user.types'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<IUser>,
  ) {}

  public async create(user: {
    email: string
    password: string
    role?: string
  }): Promise<IUser> {
    return this.userRepository.save(user)
  }

  public findAll(): Promise<IUser[]> {
    return this.userRepository.find()
  }

  public findOneByEmail(email: string): Promise<IUser> {
    return this.userRepository.findOne({ email })
  }

  public findOneById(id: string): Promise<IUser> {
    return this.userRepository.findOne(id)
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
