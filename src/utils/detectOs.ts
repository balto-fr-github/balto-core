type OS = {
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  isOther: boolean;
};

export const useDetectOS = (): OS => {
  if (typeof navigator === "undefined") {
    return {
      isWindows: false,
      isMac: false,
      isLinux: false,
      isAndroid: false,
      isIOS: false,
      isOther: true,
    };
  }

  const userAgent = navigator.userAgent;

  return {
    isWindows: /Windows NT/i.test(userAgent),
    isMac: /Macintosh|Mac OS X/i.test(userAgent),
    isLinux: /Linux/i.test(userAgent) && !/Android/i.test(userAgent),
    isAndroid: /Android/i.test(userAgent),
    isIOS: /iPad|iPhone|iPod/i.test(userAgent),
    isOther:
      !/Windows NT|Macintosh|Mac OS X|Linux|Android|iPad|iPhone|iPod/i.test(
        userAgent
      ),
  };
};
