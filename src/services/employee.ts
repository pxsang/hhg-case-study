import Api from '../helpers/api';

export const getEmployees = (page?: number) => {
  const options = {
    // page,
    // limit: 5,
    sortBy: 'createdAt',
    order: 'desc',
  }

  return Api.get('/employees', options)
}

export const createEmployee = (data: any) => {
  return Api.post('/employees', { ...data, createdAt: new Date().toISOString() })
}