import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Session } from './dto/user-session.dto';
import { User } from './entities/user.entity';

type Res = { message: string };

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User | Res> {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'You already have an account with this email',
        },
        HttpStatus.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<Res | User[]> {
    const res = await this.userRepository.find();
    if (res.length === 0) {
      return {
        message: 'No users found',
      };
    }
    return res;
  }

  async findOne(id: number): Promise<User | Res> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      return {
        message: `User with id ${id} not found`,
      };
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    this.userRepository.delete(id);
    return {
      message: `User with id ${id} has been deleted`,
    };
  }

  async authenticate(email: string, password: string): Promise<Session | Res> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) {
      return {
        message: 'User not found',
      };
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, sub: user.id };
      const jwtoken = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        jwt: jwtoken,
      };
    } else {
      return {
        message: 'Password is incorrect',
      };
    }
  }
}
