import { Store } from "@store/index";

declare global {
  interface Window {
    store: Store;
    Quill: any;
    Swiper: any;
    PDFObject: any;
    Viewer: any;
  }
}