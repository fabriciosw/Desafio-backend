import request from 'supertest';

const app = 'http://localhost:3001';

let token: string;
let noPermissionToken: string;

describe('Session', () => {
  it('should receive CPF', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      password: '12345',
    });
    expect(response.body).toStrictEqual(['CPF is required']);
    expect(response.status).toBe(400);
  });

  it('should receive 14 lenght string cpf', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      cpf: '111.111.111-11q',
      password: '',
    });
    expect(response.body).toStrictEqual([
      'body.cpf must be exactly 14 characters',
    ]);
    expect(response.status).toBe(400);
  });

  it('should receive valid cpf format', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      cpf: '111.111.111.11',
      password: '',
    });
    expect(response.body).toStrictEqual(['CPF format is invalid']);
    expect(response.status).toBe(400);
  });

  it('should receive password', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      cpf: '123.456.789-12',
    });
    expect(response.body).toStrictEqual(['Password is required']);
    expect(response.status).toBe(400);
  });

  it('should return error with invalid credentials', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      cpf: '123.456.789-99',
      password: '12345',
    });
    expect(response.body).toStrictEqual({
      status: 401,
      message: 'Incorrect email/password combination.',
    });
    expect(response.status).toBe(401);
  });

  it('should return a valid token with valid credentials', async () => {
    const response = await request(app).post(`/api/v1/session/`).send({
      cpf: '123.456.789-12',
      password: '12345',
    });
    // a token is always 160 characters long
    expect(response.body.token).toHaveLength(160);
    expect(response.body.message).toBe('Logged in');
    expect(response.status).toBe(201);

    token = `bearer ${response.body.token}`;

    const { body } = await request(app).post(`/api/v1/session/`).send({
      cpf: '222.222.222-44',
      password: '12345',
    });
    noPermissionToken = `bearer ${body.token}`;
  });
});

describe('Users', () => {
  describe('get /api/v1/users', () => {
    it('should ask for a token', async () => {
      const response = await request(app).get(`/api/v1/users`);

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('JWT Token is missing.');
    });

    it('should ask for a valid token', async () => {
      const response = await request(app)
        .get(`/api/v1/users`)
        .set(
          'Authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoidHJ1ZSIsImlhdCI6MTY1NTQ4NzEwMywiZXhwIjoxNjU1NDk3OTAzLCJzdWIiOiIxIn0.tRYnuxFXxfnk5dE9bScuDBQ4DUfeAGl57PLyO7EonPl'
        );

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('Invalid JWT Token.');
    });

    it('should return users', async () => {
      const response = await request(app)
        .get(`/api/v1/users`)
        .set('Authorization', token);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array<Object>);
    });
  });

  let userId: number;
  describe('post /api/v1/users', () => {
    it('should ask for a token', async () => {
      const response = await request(app).post(`/api/v1/users`);

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('JWT Token is missing.');
    });

    it('should ask for a valid token', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .set(
          'Authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoidHJ1ZSIsImlhdCI6MTY1NTQ4NzEwMywiZXhwIjoxNjU1NDk3OTAzLCJzdWIiOiIxIn0.tRYnuxFXxfnk5dE9bScuDBQ4DUfeAGl57PLyO7EonPl'
        );

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('Invalid JWT Token.');
    });

    it('should receive an admin token', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .send({})
        .set('Authorization', noPermissionToken);

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual('UNAUTHORIZED');
    });

    it('should ask for a valid body', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .send({})
        .set('Authorization', token);
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual([
        'Name is required',
        'CPF is required',
        'Birth date is required',
        'Password is required',
        'Permission is required',
      ]);
    });

    it('should not create duplicated(CPF) user', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .send({
          name: 'ademiro',
          cpf: '123.456.789-12',
          birthDate: '07/12/2003',
          password: '12345',
          obs: 'Fullstack dev',
          permission: false,
        })
        .set('Authorization', token);
      expect(response.status).toBe(409);
      expect(response.body.message).toStrictEqual(
        "There's already an user with that CPF"
      );
    });

    it('should be able to create a new user', async () => {
      const response = await request(app)
        .post(`/api/v1/users`)
        .send({
          name: 'TEST USER',
          cpf: '999.999.999-99',
          birthDate: '07/12/2003',
          password: '12345',
          permission: false,
        })
        .set('Authorization', token);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('name');
      expect(response.body.user).toHaveProperty('cpf');
      expect(response.body.user).toHaveProperty('birthDate');
      expect(response.body.user).toHaveProperty('permission');
      expect(response.body.user).toHaveProperty('created_at');

      userId = response.body.user.id;
    });
  });

  describe('put api/v1/users/{userId}', () => {
    it('should ask for a token', async () => {
      const response = await request(app).put(`/api/v1/users/${userId}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('JWT Token is missing.');
    });

    it('should ask for a valid token', async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set(
          'Authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoidHJ1ZSIsImlhdCI6MTY1NTQ4NzEwMywiZXhwIjoxNjU1NDk3OTAzLCJzdWIiOiIxIn0.tRYnuxFXxfnk5dE9bScuDBQ4DUfeAGl57PLyO7EonPl'
        );

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('Invalid JWT Token.');
    });

    it('should receive an admin token', async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send({})
        .set('Authorization', noPermissionToken);

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual('UNAUTHORIZED');
    });

    it('should ask for a valid body', async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send({})
        .set('Authorization', token);
      expect(response.status).toBe(400);
      expect(response.body).toStrictEqual(['Permission is required']);
    });

    it("should update user's info", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send({ obs: 'Trainee', permission: true })
        .set('Authorization', token);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('User updated');
      expect(response.body.update.permission).toBe(true);
      expect(response.body.update.obs).toBe('Trainee');
    });
  });

  describe('delete /api/v1/users/{userId}', () => {
    it('should ask for a token', async () => {
      const response = await request(app).delete(`/api/v1/users/${userId}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('JWT Token is missing.');
    });

    it('should ask for a valid token', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set(
          'Authorization',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoIjoidHJ1ZSIsImlhdCI6MTY1NTQ4NzEwMywiZXhwIjoxNjU1NDk3OTAzLCJzdWIiOiIxIn0.tRYnuxFXxfnk5dE9bScuDBQ4DUfeAGl57PLyO7EonPl'
        );

      expect(response.status).toBe(401);
      expect(response.body.message).toStrictEqual('Invalid JWT Token.');
    });

    it('should receive an admin token', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .send({})
        .set('Authorization', noPermissionToken);

      expect(response.status).toBe(401);
      expect(response.body).toStrictEqual('UNAUTHORIZED');
    });

    it('Should be able to delete an user', async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set('Authorization', token);

      expect(response.status).toBe(204);
    });
  });
});
