import { z } from 'zod'

export default z.object({
  email: z.string().email({ message: 'Неправильный email' }),
  message: z.string().min(5, { message: 'Длина сообщения должна быть больше 5 символов' }),
})
