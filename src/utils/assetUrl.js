const apiBaseUrl = import.meta.env.VITE_API_URL || "";
const imageBaseUrl = import.meta.env.VITE_IMAGE_URL || apiBaseUrl;

const assetUrl = (assetPath) => {
  if (!assetPath) {
    return "";
  }

  if (/^(data:|https?:\/\/|blob:)/i.test(assetPath)) {
    return assetPath;
  }

  if (assetPath.startsWith("/api/")) {
    const apiOrigin = new URL(apiBaseUrl || window.location.origin, window.location.origin).origin;
    return new URL(assetPath, apiOrigin).href;
  }

  const baseUrl = new URL(imageBaseUrl || window.location.origin, window.location.origin);
  if (!import.meta.env.VITE_IMAGE_URL) {
    baseUrl.pathname = baseUrl.pathname.replace(/\/api\/?$/, "");
  }
  return new URL(
    assetPath.replace(/\\/g, "/").replace(/^\/+/, ""),
    `${baseUrl.origin}${baseUrl.pathname.replace(/\/+$/, "")}/`
  ).href;
};

export default assetUrl;
