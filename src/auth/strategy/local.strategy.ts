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
     const employee = await this.authService.loginEmployee(email, password);

     const employer = await this.authService.loginEmployer(email, password);

     if (!employee) {
       throw new UnauthorizedException('wrong email or password');
     }

     if (!employer) {
      throw new UnauthorizedException('wrong email or password');
    }

     return [employer,employee];
   }
}
