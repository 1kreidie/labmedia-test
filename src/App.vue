<script setup lang="ts">
import type { FormInterface } from './interfaces/form.interface';

import useForm from './composables/useForm';

import formSchema from './schema/form.schema';

/** поля формы */
const formFields = { email: '', message: '' }

const { 
  formState, 
  formErrors, 
  formValid, 
  updateValue, 
  validateForm 
} = useForm<FormInterface>(formFields, formSchema)
</script>

<template>
  <section>
    <input
      type="text" 
      placeholder="Email"
      :value="formState.email"
      @input="updateValue($event.target, 'email')"
     >
    <input 
      type="text" 
      placeholder="сообщение"
      :value="formState.message"
      @input="updateValue($event.target, 'message')"
    >
    <button @click="validateForm">Отправить</button>
    <pre>formErrors: {{ formErrors }} </pre>
    <pre>formValid: {{ formValid }} </pre>
  </section>
</template>
