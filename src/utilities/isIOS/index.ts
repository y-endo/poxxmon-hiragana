export const isIOS = () => {
  const agent = navigator.userAgent.toLowerCase();

  const isiPhone = /iphone|ipod/.test(agent);
  const isiPad = /ipad|macintosh/.test(agent) && 'ontouchend' in document;

  return isiPhone || isiPad;
};
