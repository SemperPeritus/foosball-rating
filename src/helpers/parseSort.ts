// GET request example: ?sort=foo,bar:DESC
// Return example : { foo: 'ASC', bar: 'DESC' }

// TODO: Add validation
export const parseSort = (sort: string) => {
  if (!sort) {
    return null;
  }

  const sortList = sort && sort.split(',');
  const preparedMap = sortList.map(item => item.split(':'));

  return preparedMap.reduce((acc, item) => {
    acc[item[0]] = item[1] || 'ASC';
    return acc;
  }, {});
};
