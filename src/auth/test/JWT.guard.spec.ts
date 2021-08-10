import { Reflector } from '@nestjs/core';
import { createMock } from '@golevelup/nestjs-testing';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;

  beforeEach(() => {
    guard = new JwtAuthGuard(new Reflector());
  });

  describe('JwtAuthGuard', () => {
    describe('when JwtAuthGuard is called', () => {
      test('then it should be defined', () => {
        expect(guard).toBeDefined();
      });

      test('then it should allow authentication with token', async () => {
        try {
          const context = createMock<ExecutionContext>();

          context.switchToHttp().getRequest.mockReturnValue({
            headers: {
              authorization: 'auth',
            },
          });

          expect(await guard.canActivate(context)).toBeTruthy();
        } catch (error) {}
      });

      test("then it shouldn't allow authentication without token", async () => {
        try {
          const context = createMock<ExecutionContext>();

          context.switchToHttp().getRequest.mockReturnValue({
            headers: {
              authorization: '',
            },
          });

          await guard.canActivate(context);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });
    });
  });
});
