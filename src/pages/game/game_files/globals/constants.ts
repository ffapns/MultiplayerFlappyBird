namespace Flappy.Global {
  export class Constants {
      public static gameSpeed: number = 0.1;
      public static jumpSpeed: number = 500;
      public static gapSize: number = 155;
      public static gravity: number = 2000;
      public static pipeSpacing: number = 200;
      public static terminalVelocity: number = 700;

      public static get serverUrl(): string {
          if (window.location.href === 'http://192.168.49.1:8100' || window.location.href === 'http://localhost:8100') {
              return 'http://localhost:9001';
          } else {
              return 'https://multiflappybirdserver.herokuapp.com';
          }
      }

      public static gameHeight: number = 665;

      public static get gameWidth(): number {
          const ratio = this.gameHeight / window.innerHeight;
          return window.innerWidth * ratio;
      }

      public static worldOffset: number = -1000;
  }
}
