export function logger(message: string, error?: Error): void {
  if (process.env.NODE_ENV === "development") {
    if (error && error.message) {
      console.error(message, error.message);
    } else {
      console.log(message);
    }
  }
}
