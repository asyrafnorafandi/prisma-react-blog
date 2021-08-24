import shell from 'shelljs';

export default (schemaName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    shell.exec(
      `DATABASE_URL=postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=${schemaName} npx prisma migrate reset --force --skip-seed`,
      { silent: true },
      (code, stdout, stderr) => {
        if (code !== 0) {
          reject(stderr || stdout || 'non-zero exit code');
        }

        resolve();
      },
    );
  });
};
