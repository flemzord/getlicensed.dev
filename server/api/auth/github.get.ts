import {prisma} from "@/prisma/client";

async function getUserByEmail(email: string) {
  return await prisma.user.findFirst({ where: { email } });
}

async function createUser(param: { githubId: string; name: string; email: string }) {
  return await prisma.user.create({ data: param })
}

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const existingUser = await getUserByEmail(user.email);
    if (!existingUser) {
      await createUser({
        email: user.email,
        name: user.name,
        githubId: user.id.toString()
      });
    }

    await setUserSession(event, { user });
    return sendRedirect(event, "/dashboard");
  },
  onError(event, error) {
    console.error('Github OAuth error:', error)
    return sendRedirect(event, '/')
  },
});


