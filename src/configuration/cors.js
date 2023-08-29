import { Dotenv } from '@/utils/Dotenv'

new Dotenv()

export default {
	origin: '*',
	optionsSuccessStatus: 200,
	allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
	exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token', 'RoleCategory'],
}
