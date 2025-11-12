export const hasNativeHLS = () => {
  if (typeof navigator !== "undefined") {
    const userAgent = navigator.userAgent;

    const isIOS = /iPad|iPhone|iPod/i.test(userAgent);

    const isMacOS = /Macintosh/i.test(userAgent);

    const isSafari = /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);

    return isIOS || (isMacOS && isSafari);
  }
  return false;
};

type OS = {
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isOther: boolean;
};
