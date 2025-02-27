type AudioResource = {
  src: string;
  audio: HTMLAudioElement;
  isLoaded: boolean;
};

export class AudioManager {
  private resources: Map<string, AudioResource>;

  constructor() {
    this.resources = new Map();
  }

  /**
   * リソースを登録する
   * @param id リソースID
   * @param src audioファイルのパス
   */
  register(id: string, src: string) {
    if (this.resources.has(id)) {
      console.warn(`Resource with id "${id}" is already registered.`);
      return;
    }
    const audio = new Audio();
    this.resources.set(id, { src, audio, isLoaded: false });
  }

  /**
   * リソースをロードする
   * @param id リソースID
   * @returns Promise<void>
   */
  async load(id: string): Promise<void> {
    const resource = this.resources.get(id);
    if (!resource) {
      console.error(`Resource with id "${id}" is not registered.`);
      return;
    }

    return new Promise((resolve, reject) => {
      if (resource.isLoaded) {
        resolve();
        return;
      }
      resource.audio.src = resource.src;
      resource.audio.addEventListener('canplaythrough', () => {
        resource.isLoaded = true;
        resolve();
      });
      resource.audio.addEventListener('error', () => {
        reject(new Error(`Failed to load resource: ${resource.src}`));
      });
      resource.audio.load();
    });
  }

  /**
   * 再生する
   * @param id リソースID
   */
  play(id: string) {
    const resource = this.resources.get(id);
    if (!resource || !resource.isLoaded) {
      console.error(
        `Resource with id "${id}" is not loaded. Call load() first.`
      );
      return;
    }
    resource.audio.play();
  }

  /**
   * 停止する
   * @param id リソースID
   */
  stop(id: string) {
    const resource = this.resources.get(id);
    if (!resource || !resource.isLoaded) {
      console.error(
        `Resource with id "${id}" is not loaded. Call load() first.`
      );
      return;
    }
    resource.audio.pause();
    resource.audio.currentTime = 0;
  }

  /**
   * 再生位置の移動
   * @param id リソースID
   * @param time 移動先の時間
   */
  seek(id: string, time: number) {
    const resource = this.resources.get(id);
    if (!resource || !resource.isLoaded) {
      console.error(
        `Resource with id "${id}" is not loaded. Call load() first.`
      );
      return;
    }
    resource.audio.currentTime = time;
  }

  /**
   * ボリュームを設定する
   * @param id リソースID
   * @param volume ボリューム(0-1)
   */
  setVolume(id: string, volume: number) {
    const resource = this.resources.get(id);
    if (!resource || !resource.isLoaded) {
      console.error(
        `Resource with id "${id}" is not loaded. Call load() first.`
      );
      return;
    }
    if (volume <= 0) {
      resource.audio.muted = true;
    } else {
      resource.audio.muted = false;
    }
    resource.audio.volume = Math.max(0, Math.min(volume, 1)); // 0.0 ~ 1.0 の範囲に制限
  }

  /**
   * ループ再生の設定
   * @param id リソースID
   * @param loop ループ再生するかどうか
   */
  setLoop(id: string, loop: boolean) {
    const resource = this.resources.get(id);
    if (!resource || !resource.isLoaded) {
      console.error(
        `Resource with id "${id}" is not loaded. Call load() first.`
      );
      return;
    }
    resource.audio.loop = loop;
  }

  /**
   * 登録済みリソースの一覧を取得する
   * @returns string[] 登録済みIDの一覧
   */
  getRegisteredIds(): string[] {
    return Array.from(this.resources.keys());
  }

  /**
   * リソースの削除
   * @param id リソースID
   */
  delete(id: string) {
    if (this.resources.has(id)) {
      this.resources.delete(id);
    } else {
      console.warn(`Resource with id "${id}" is not registered.`);
    }
  }
}
