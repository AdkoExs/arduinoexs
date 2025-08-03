(function(Scratch) {
  class ESPRGB {
    constructor() {
      this.ws = null;
      this.connect();
    }

    connect() {
      try {
        this.ws = new WebSocket("ws://192.168.100.115:81/");
        this.ws.onopen = () => console.log("WebSocket connected");
        this.ws.onerror = e => console.error("WebSocket error", e);
      } catch (err) {
        console.error("Failed to connect WebSocket", err);
      }
    }

    getInfo() {
      return {
        id: "espRGB",
        name: "ESP RGB LED",
        blocks: [
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set RGB color R:[R] G:[G] B:[B]",
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
        ],
      };
    }

    setColor(args) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const r = Math.max(0, Math.min(255, args.R));
        const g = Math.max(0, Math.min(255, args.G));
        const b = Math.max(0, Math.min(255, args.B));
        const msg = JSON.stringify({ r, g, b });
        this.ws.send(msg);
      } else {
        console.warn("WebSocket not connected");
      }
    }
  }

  Scratch.extensions.register(new ESPRGB());
})(Scratch);
