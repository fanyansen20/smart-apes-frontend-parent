const handlerRedirectToMarketPlace = (pathname, useWindowLocation) => {
  const isPathname = pathname ?? "";
  const marketPlaceUrl = process.env.REACT_APP_MARKETPLACE_URL;

  if (useWindowLocation) {
    window.location = `${marketPlaceUrl}/${isPathname}`;
  }
  return `${marketPlaceUrl}${isPathname}`;
};

export default handlerRedirectToMarketPlace;
