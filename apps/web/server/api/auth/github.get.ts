async function getUserByEmail(email: string) {
  return await useDB().user.findFirst({
    where: {
      email: email,
    },
  });
}

async function createUser(param: {
  githubId: number;
  name: string;
  email: string;
}) {
  return await useDB().user.create({
    data: {
      name: param.name,
      email: param.email,
      githubId: param.githubId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    const existingUser = await getUserByEmail(user.email);
    if (existingUser === null) {
      await createUser({
        email: user.email,
        name: user.name,
        githubId: user.id,
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
