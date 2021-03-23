export const converRepoUrlToAPIUrl = (repoUrl: string): string => {
  const userAndRepo = repoUrl.replace('https://github.com/', '');
  const [user, repo] = userAndRepo.split('/');
  return `https://api.github.com/repos/${user}/${repo}/contents`;
}
