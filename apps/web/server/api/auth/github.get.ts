import { schema } from '@getlicensed/db';
import { eq } from 'drizzle-orm';

async function getUserByEmail(email: string) {
  return useDB()
    .select()
    .from(schema.user)
    .where(eq(schema.user.email, email))
    .limit(1);
}

async function createUser(param: {
  githubId: string;
  name: string;
  email: string;
}) {
  return useDB()
    .insert(schema.user)
    .values({
      name: param.name,
      email: param.email,
      githubId: param.githubId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
}

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser.length === 0) {
      await createUser({
        email: user.email,
        name: user.name,
        githubId: user.id.toString(),
      });
    }

    await setUserSession(event, { user });
    return sendRedirect(event, '/dashboard');
  },
  onError(event, error) {
    console.error('Github OAuth error:', error);
    return sendRedirect(event, '/');
  },
});
