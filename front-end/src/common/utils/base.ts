import { Type } from '@common/enums/base';

export const type = <T>(obj: T) => {
  const type = Object.prototype.toString.call(obj);
  return type.substring(8, type.length - 1);
};

export const getReturnUrlPath = () => {
  const location = window.location;

  if (location.hash.indexOf('login') === -1) {
    const encodePath = encodeURIComponent((location.hash + location.search).substring(1));

    return `returnUrl=${encodePath}`;
  }
};

export const getHashReturnUrlParam = (search: string) => {
  return getLocationHashParam(search && search.substr(1), 'returnUrl');
};

export const getLocationHashParam = (queryString: string, getValue: string) => {
  const urlSearchParams = new URLSearchParams(queryString);

  return urlSearchParams.get(getValue);
};

export const isEmpty = <T>(obj: T) => {
  if (type(obj) === Type.Array) {
    return (obj as any).length === 0;
  }
  if (type(obj) === Type.Object) {
    return Object.keys(obj).length === 0;
  }
  return !obj;
};

export const getUrlQuery = (query: String, search?: string) => {
  const name = query.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`, 'i');
  const results = regex.exec(search || window.location.search || window.parent.location.search);

  return results === null || results[1] === '' ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const getCanvasBase64 = (img: string) => {
  const image = new Image();
  image.crossOrigin = '';
  image.src = img;

  if (img) {
    return new Promise((resolve, reject) => {
      image.onload = () => {
        resolve(getBase64Image(image));
      };
    });
  }
};

export const getBase64Image = (img: any, width?: string, height?: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = width ? width : img.width;
  canvas.height = height ? height : img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();
  return dataURL;
};

export const getImgFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = function () {
      resolve(img);
    };
  });
};