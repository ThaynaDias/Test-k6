export const optionsLight = {
  vus: 5,
  duration: '10s',
};

export const optionsMedio = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '30s', target: 10 },
    { duration: '15s', target: 0  },
  ],
};

export const optionsHeavy = {
  stages: [
    { duration: '30s', target: 50 },
    { duration: '1m',  target: 50 },
    { duration: '30s', target: 0  },
  ],
};