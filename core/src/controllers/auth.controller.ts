import { PrismaClient } from '@prisma/client';
import { prismaClient } from '../utils';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from '../interfaces/auth.interface';
import config from 'config';

export class AuthController {
  private prisma: PrismaClient;

  constructor(pc?: PrismaClient) {
    this.prisma = pc || prismaClient;
  }

  /**
   * User login
   */
  async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    // Validate request body
    if (!email || !password) {
      throw new Error('Email & password required.');
    }

    // Check email and password
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid email/password.');
    }

    // Generate access token
    const accessToken = sign({ id: user.id }, config.get('auth.secret'));

    return {
      accessToken,
    };
  }
}
