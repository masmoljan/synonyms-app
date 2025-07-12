interface ErrorData {
  [key: string]: any;
}

export const errorLogger = (title: string, data?: ErrorData) => {
  if (data) {
    console.log(`[APPLICATION ERROR] ${title}: `, data);
  } else {
    console.log(`[APPLICATION ERROR] ${title}`);
  }
};
