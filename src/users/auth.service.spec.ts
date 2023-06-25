import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of ath service', async () => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signUp('qwer@mail.com', 'qwer');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async (done) => {
    await service.signUp('test3@tt.com', 'aaaa');
    try {
      await service.signUp('test3@tt.com', 'aaaa');
    } catch (error) {
      done();
    }
  });

  // it('throws if signin is called with an unused email', async (done) => {
  //   await expect(service.signIn('test3@tt.com', 'aaaa')).rejects.toThrow(
  //     NotFoundException,
  //   );
  // });

  it('throws if an invalid password is provided', async (done) => {
    await service.signUp('test3@tt.com', 'asdf');
    try {
      await service.signIn('test3@tt.com', 'aaaa');
    } catch (error) {
      done();
    }
  });

  it('returns a user if correct password is provided', async () => {
    await service.signUp('test3@tt.com', 'aaaa');
    const user = await service.signIn('test3@tt.com', 'aaaa');
    expect(user).toBeDefined();
  });
});
