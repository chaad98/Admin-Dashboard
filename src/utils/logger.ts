export function logger(message: string, data: any, error?: Error): void {
  if (process.env.NODE_ENV === "development") {
    if (error && error.message) {
      console.error(message, error.message);
    } else if (data !== undefined) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}
