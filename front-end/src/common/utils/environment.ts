const getEnvironment = () => {
  return process.env.API_URL || "";
};

export const environment = getEnvironment();