export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {
    await setUserSession(event, { user });
    return sendRedirect(event, "/dashboard");
  },
});
