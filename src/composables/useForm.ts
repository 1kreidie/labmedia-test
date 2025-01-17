import { ref } from 'vue'

/**
 * Создание формы и валидация данных
 * @param fields объект полей формы по умолчанию
 * @param schema схема валидации данных формы
 */
export default <T>(fields: T, schema: any) => {
  // если чего-то не хватает из обязательных параметров, кидаем ошибку
  if (!fields || !schema) {
    throw new Error('Не переданн fields или schema')
  }

  /** переменные формы */
  const formState = ref<T>(fields)
  /** валидность формы */
  const formValid = ref<Record<string, boolean>>({})
  /** ошибки формы */
  const formErrors = ref<Record<string, string>>({})

  // заполняем formValid и formErrors
  Object.keys(fields).forEach((key) => {
    formValid.value[key] = true
    formErrors.value[key] = 'invalid'
  })

  return {
    formState,
    formValid,
    formErrors,
    /**
     * Обновление значения формы
     * @param value значение
     * @param key ключ
     */
    updateValue: <T>(value: T, key: string): void => {
      // если передали EventTarget достаем из него value
      formState.value[key] = value instanceof EventTarget ? (value as any).value : value
      formValid.value[key] = true
    },
    /**
     * Валидация формы
     */
    validateForm: (): boolean => {
      const { success, error } = schema.safeParse(formState.value)
      const { fieldErrors } = error.formErrors || {}

      // переключаем formValid на false и подставляем сообщение ошибки
      Object.keys(fieldErrors).forEach((key) => {
        formValid.value[key] = false
        formErrors.value[key] = fieldErrors[key][0]
      })

      return success
    },
  }
}
