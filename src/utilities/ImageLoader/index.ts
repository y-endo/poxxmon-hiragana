type ImageStatus = 'loading' | 'loaded' | 'error';

interface ImageLoadStatus {
  url: string;
  status: ImageStatus;
}

export class ImageLoader {
  private images: Map<string, HTMLImageElement> = new Map();
  private statuses: Map<string, ImageStatus> = new Map();

  load(urls: string | string[]): Promise<ImageLoadStatus[]> {
    const urlArray = Array.isArray(urls) ? urls : [urls];
    const promises = urlArray.map(url => this.loadImage(url));
    return Promise.all(promises);
  }

  private loadImage(url: string): Promise<ImageLoadStatus> {
    return new Promise(resolve => {
      if (this.statuses.has(url)) {
        resolve({ url, status: this.statuses.get(url)! });
        return;
      }

      const img = new Image();
      this.images.set(url, img);
      this.statuses.set(url, 'loading');

      img.onload = () => {
        this.statuses.set(url, 'loaded');
        resolve({ url, status: 'loaded' });
      };

      img.onerror = () => {
        this.statuses.set(url, 'error');
        resolve({ url, status: 'error' });
      };

      img.src = url;
    });
  }

  clear(url: string) {
    if (this.images.has(url)) {
      this.images.delete(url);
      this.statuses.delete(url);
    }
  }

  clearAll() {
    this.images.clear();
    this.statuses.clear();
  }
}
