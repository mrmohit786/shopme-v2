export const Logger = {
  info: (...msg) => {
    const [error, ...extra] = msg;
    const localMsg = `INFO :: ${new Date()} :: ${JSON.stringify(error, 0, 2)}`;
    console.info(localMsg, ...extra);
  },
  warn: (...msg) => {
    const [error, ...extra] = msg;
    const localMsg = `WARN :: ${new Date()} :: ${JSON.stringify(error, 0, 2)}`;
    console.warn(localMsg, ...extra);
  },
  debug: (...msg) => {
    const localMsg = `DEBUG :: ${new Date()} :: `;
    console.debug(localMsg, ...msg);
  },
  error: (...msg) => {
    const localMsg = `ERROR :: ${new Date()}}`;
    console.error(localMsg, ...msg);
  },
  logObject: (...msg) => console.debug(...msg),
};
