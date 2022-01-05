import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UsersService } from './users.service';

function _getJwtFromContext(context: GqlExecutionContext) {
    const request = context.getContext().req
    const jwt = request.headers.authentication as string
    return jwt
}

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private usersService: UsersService){}


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const jwt = _getJwtFromContext(ctx)
        if(!jwt) {
            throw new UnauthorizedException("Not Authentication token was provided")
        }
        const user = await this.usersService.getByJwt(jwt)
        // NOTE: I want to store this user object in the context. That was we do not need to fetch it again later.
        // EXAMPLE: the `getNames` query gets the user twice. once when checking Auth, and once when getting for the names. 
        // These is a better way to do this.
        // If this were going to a real product, I would work with team members to come up with a good solution
        return !!user;
    }
}

export const Jwt = createParamDecorator(
    async (data: unknown, ctx: ExecutionContext) => {
      const context = GqlExecutionContext.create(ctx)
      return _getJwtFromContext(context)
    },
  );
  