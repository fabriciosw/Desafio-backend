import AppError from '../../src/utils/AppError';
import { createUserService } from '../../src/services/user.services';

describe('User service', () => {
  const users = [
    {
      id: 1,
      name: 'Ademiro',
      cpf: '123.456.789-12',
      birthDate: '2020-02-29',
      obs: 'Ademiro master',
      permission: true,
      created_at: '2022-06-08 18:18:31.994',
      password: '$2b$10$xNgQ5BCfpOpzLEDrB/vH8.RREB/11vjU40ASdoXeiU8GvRalHPONi', // 12345
    },
    {
      id: 2,
      name: 'John',
      cpf: '123.456.789-13',
      birthDate: '2020-02-29',
      obs: 'Cena',
      permission: false,
      created_at: '2022-06-08 18:18:32.000',
      password: '$2b$10$xNgQ5BCfpOpzLEDrB/vH8.RREB/11vjU40ASdoXeiU8GvRalHPONi', // 12345
    },
  ];

  const findByCPFFake = jest
    .fn()
    .mockImplementation((cpf: string) =>
      users.find((user) => user.cpf === cpf)
    );

  const createFake = jest
    .fn()
    .mockImplementation((name, cpf, birthDate, obs, permission, password) => {
      const user = {
        name,
        cpf,
        birthDate,
        obs,
        permission,
        password,
        id: Math.floor(Math.random() * (10000 - 3)) + 1,
        created_at: Date.now(),
      };

      return user;
    });

  const saveFake = jest.fn().mockImplementation(() => true);

  jest.mock('typeorm', () => {
    return {
      __esModule: true,
      getCustomRepository: jest.fn(() => {
        const obj = {
          create: createFake,
          save: saveFake,
          findByCPF: findByCPFFake,
        };
        return obj;
      }),
    };
  });

  it('Should be able to create a new user', async () => {
    const userToBeCreated = {
      name: 'Katniss',
      cpf: '123.456.789-14',
      birthDate: '2020-02-29' as unknown as Date,
      obs: '',
      permission: false,
      password: 'KatnissPassword',
    };
    const user = await createUserService(userToBeCreated);

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
    expect(createFake).toHaveBeenCalledTimes(1);
    expect(saveFake).toHaveBeenCalledTimes(1);
    expect(findByCPFFake).toHaveBeenCalledTimes(1);
  });

  it('Shouldnt be able to create a new user with duplicated email', async () => {
    const userToBeCreated = {
      name: 'Ademiro',
      cpf: '123.456.789-12',
      birthDate: '2020-02-29' as unknown as Date,
      obs: 'Ademiro master',
      permission: true,
      password: '12345',
    };
    await expect(createUserService(userToBeCreated)).rejects.toBeInstanceOf(
      AppError
    );
    await expect(createUserService(userToBeCreated)).rejects.toThrowError(
      "There's already an user with that CPF"
    );
  });
});
