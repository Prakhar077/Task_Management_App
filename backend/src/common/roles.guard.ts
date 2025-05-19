import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true; // no roles required
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('No user found in request');

    if (requiredRoles.includes(user.role)) {
      return true;
    }
    throw new ForbiddenException('You do not have permission (role)');
  }
}
