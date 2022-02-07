import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'



describe('Authservice', () => {
    let service: AuthService
    let fakeUsersService: Partial<UsersService>
    beforeEach(async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve(({ id: 1, email, password }) as User)
        }

        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile()
        service = module.get(AuthService)
    })

    it('can create instance of auth service', async () => {
        expect(service).toBeDefined()
    })

    it('creates a new user with the salted and hashed password', async () => {
        const user = await service.signup('asdf@test.com', 'asdf')
        expect(user.password).not.toEqual('asdf')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()

    })
    it('throws an error if user signs up with email already in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a@test.com', password: 'asdf' } as User])
        try {
            await service.signup('asdf@test.com', 'asdf')
        } catch (err) {
            expect(err).toBeInstanceOf(BadRequestException);
            expect(err.message).toBe('email is in use');
        }
    })
    it('throws an error if user signs in with unused email', async (done) => {

        try {
            await service.signin('asdf@test.com', 'asdf')
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toBe('user not found signin');
        }
    })
    it('throws if an invalid password is provided', async () => {
        try {
            await service.signin('asdf@test.com', 'asdf')
        } catch (err) {
            expect(err).toBeInstanceOf(NotFoundException);
            expect(err.message).toBe('user not found signin');
        }
    })

})

