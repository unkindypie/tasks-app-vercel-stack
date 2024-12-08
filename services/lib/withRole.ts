async function getCurrentUser(): Promise<{ role: string }> {
  return new Promise(
    (resolve) => setTimeout(() => resolve({ role: 'admin' }), 500), // Dummy user with "admin" role
  );
}

export function withRole<
  T extends (
    ...args: Parameters<T>[]
  ) => Promise<ReturnType<T>> | ReturnType<T>,
>(
  requiredRole: string,
  fn: T,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    const user = await getCurrentUser();
    if (user.role === requiredRole) {
      return await fn(...args);
    } else {
      throw new Error(
        `Permission denied: User does not have the required role '${requiredRole}'.`,
      );
    }
  };
}
