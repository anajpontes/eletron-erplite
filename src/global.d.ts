declare global {
  interface Window {
    api: {
      login(
        email: string,
        password: string
      ): Promise<{
        user: User;
        session: Session;
      }>;
      products(): Promise<Product[]>;
    };
  }
}

export {};
