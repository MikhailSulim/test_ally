export const AUTH_API_URL: string =
  'https://api.sulim.yp-diploma.nomoredomains.rocks';
export const REG_EMAIL: RegExp =
  /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

interface Errors {
  [key: string]: string;
}

export const ERRORS: Errors = {
  REQUIRED: 'Поле обязательно для заполнения',
  EMAIL: 'Некорректный адрес электронной почты',
  PASSWORD: 'Минимальная длина пароля 8 символов',
};
