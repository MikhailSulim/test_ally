'use client';
import React, { useState } from 'react';
import styles from './Form.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ERRORS, REG_EMAIL } from '@/utils/constants';
import authApi from '@/utils/authApi';

interface FormProps {
  email: string;
  password: string;
}

const Form = () => {
  const [step, setStep] = useState<number>(1);
  const [isShowPwd, setIsShowPwd] = useState(false);
  const [textSubmitBtn, setTextSubmitBtn] = useState<string>('Войти');

  const {
    register,
    formState: { errors, isValid },
    trigger,
    handleSubmit,
    setError,
    getValues,
  } = useForm<FormProps>({ mode: 'all' });

  const onSubmit: SubmitHandler<FormProps> = async (data) => {
    const { email, password } = data;
    setTextSubmitBtn('Авторизация...');
    await authApi
      .authorize(email, password)
      .then(() => alert('Вы авторизованы!'))
      .catch((err) => {
        setError('password', { type: 'custom', message: err });
      })
      .finally(() => setTextSubmitBtn('Войти'));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <>
          <p className={styles.title}>{`Авторизация. Шаг ${step} из 2`}</p>
          <div className={styles.container}>
            <label htmlFor="login" className={styles.label}>
              Логин
            </label>
            <input
              className={styles.input}
              {...register('email', {
                pattern: { value: REG_EMAIL, message: ERRORS.EMAIL },
              })}
              onInput={(e) => {
                trigger('email');
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  setStep(2);
                }
              }}
            />
            <span className={styles.error}>{errors?.email?.message}</span>
          </div>
          <button
            type="button"
            disabled={!isValid || !getValues('email')}
            className={styles.button}
            onClick={() => setStep(2)}
          >
            Далее
          </button>
        </>
      )}
      {step === 2 && (
        <>
          <p className={styles.title}>{`Авторизация. Шаг ${step} из 2`}</p>
          <div className={styles.container}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>

            <div className={styles.inputBox}>
              <input
                type={isShowPwd ? 'text' : 'password'}
                className={styles.input}
                {...register('password', {
                  required: ERRORS.REQUIRED,
                })}
              />
              <button
                type="button"
                className={isShowPwd ? styles.pwdShow : styles.pwdHide}
                onClick={() => setIsShowPwd(!isShowPwd)}
              />
            </div>
            <span className={styles.error}>{errors?.password?.message}</span>
          </div>
          <button type="submit" className={styles.button} disabled={!isValid}>
            {textSubmitBtn}
          </button>
        </>
      )}
    </form>
  );
};

export default Form;
