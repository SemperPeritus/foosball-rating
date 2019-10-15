export const Role = {
  FAG: 50,
  NON_VERIFIED_USER: 80,
  USER: 100,
  MODERATOR: 300,
  ADMIN: 700,
};

export const RolesMap = {
  50: 'Пидор',
  80: 'Неподтверждённый пользователь',
  100: 'Пользователь',
  300: 'Модератор',
  700: 'Админ',
};

export const RolesArray = Object.keys(RolesMap).map(key => ({ privileges: key, title: RolesMap[key] }));
