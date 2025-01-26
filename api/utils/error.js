export const errorHandler = (statusCode, message) => {
  if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
    throw new Error('Status code harus berupa angka antara 100 dan 599');
  }
  if (typeof message !== 'string') {
    throw new Error('Message harus berupa string');
  }
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}