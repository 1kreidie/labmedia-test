import { ref } from 'vue'
import axios, { AxiosError } from 'axios'

import type { AxiosResponse, AxiosRequestConfig } from 'axios'

type MethodType = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH'

/**
 * Собираем data и возвращаем реактивные переменные
 * @param response ответ сервера
 */
const buildData = (response: AxiosResponse) => ({
  status: ref(response.status),
  statusText: ref(response.statusText),
  data: ref(response.data),
})

/**
 * Принимаем необходимые параметры для запроса
 * @param url
 * @param method
 * @param config
 * @param data
 */
const getData = async (url: string, method: MethodType, config: AxiosRequestConfig, data: any) => {
  switch (method) {
    case 'GET': {
      return axios.get(url, config)
    }
    case 'DELETE': {
      return axios.delete(url, config)
    }
    case 'POST': {
      return axios.post(url, data, config)
    }
    case 'PUT': {
      return axios.put(url, data, config)
    }
    case 'PATCH': {
      return axios.patch(url, data, config)
    }
    default:
      throw new Error('Передан некорректный method')
  }
}

/**
 * Отправка запроса на сервер
 * @param url url запроса
 * @param method метод запроса
 * @param config конфиг
 * @param data данные для POST, PUT, PATCH методов
 */
export default async (
  url: string,
  method: MethodType,
  config: AxiosRequestConfig = {},
  data: any = undefined,
) => {
  try {
    const response = await getData(url, method, config, data)
    return buildData(response)
  } catch (error) {
    if (error instanceof AxiosError) {
      return buildData(error.request)
    }
    throw error
  }
}
