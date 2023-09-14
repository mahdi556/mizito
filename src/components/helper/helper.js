export const handleError = (message) => {
  const errors = [];
  Object.keys(message).map((key) => {
    message[key].map((e) => {
      errors.push(e);
    });
  });
  return errors.join();
};
