export const needLogoOnly = (pathname) => {
  const listPaths = ["/terms-of-services", "/privacy-policy"];

  return listPaths.includes(pathname);
};
