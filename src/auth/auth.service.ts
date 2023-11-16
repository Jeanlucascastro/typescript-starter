import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    console.log('JPWE ', process.env.JWT_SECRET_KEY, user)
    const payload = { sub: user.id, email: user.email, admProfile: user.admin};

    const token = this.jwtService.sign(payload, { secret: `${process.env.JWT_SECRET_KEY}` })

    return {
      token: token,
      usuarioId: user.id,
      companyId: user.companyId,
    };
  }

  async validateUser(email: string, password: string) {
    let user: UsersEntity;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  async validateAdmin(email: string){
    let user: UsersEntity;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (error) {
      return null;
    }
    if (user.admin === true) {
      return true;
    } else {
      return false;
    }
  }
}
