const calculateScreenWidth = (win: any, doc: any, scr: any) => {
  if (win.innerWidth) {
    return win.innerWidth;
  }

  if (doc.documentElement.clientWidth) {
    return doc.documentElement.clientWidth;
  }

  // eslint-disable-next-line no-restricted-globals
  return scr.width;
};

const calculateScreenHeight = (win: any, doc: any, scr: any) => {
  if (win.innerHeight) {
    return win.innerHeight;
  }

  if (doc.documentElement.clientHeight) {
    return doc.documentElement.clientHeight;
  }

  return scr.height;
};

// Taken from https://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
const calculateWindowFeatures = (
  // eslint-disable-next-line no-restricted-globals
  h = 490, w = 800, win = window, doc = document, scr = screen,
) => {
  const dualScreenLeft = win.screenLeft ?? win.screenX;
  const dualScreenTop = win.screenTop ?? win.screenY;

  const width = calculateScreenWidth(win, doc, scr);
  const height = calculateScreenHeight(win, doc, scr);

  const systemZoom = width / win.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  return `height=${h},width=${w},top=${top},left=${left}`;
};

export default calculateWindowFeatures;