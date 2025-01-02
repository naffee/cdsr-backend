import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

   async validate(
     email: string,
     password: string,
   ): Promise<any> {
     this.logger.log(`Validating credentials for ${email}`);
     this.logger.log(`Validating credentials for ${email}`);
     console.log('email', email,);
     const user = await this.authService.login(email, password);

     if (!user) {
       throw new UnauthorizedException('wrong email or password');
     }

     return user;
   }
}
