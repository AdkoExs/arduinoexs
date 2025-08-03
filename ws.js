(function(Scratch) {
  class ESPRGBExtension {
    constructor() {
      this.ws = new WebSocket("ws://192.168.100.115:81/");
    }

    getInfo() {
      return {
        id: "espRGB",
        name: "ESP RGB LED",
        blocks: [{
          opcode: "setColor",
          blockType: Scratch.BlockType.COMMAND,
          text: "set color R: [R] G: [G] B: [B]",
          arguments: {
            R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
            G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
          }
        }]
      };
    }

    setColor(args) {
      if (this.ws.readyState === WebSocket.OPEN) {
        const data = JSON.stringify({
          r: Math.max(0, Math.min(255, args.R)),
          g: Math.max(0, Math.min(255, args.G)),
          b: Math.max(0, Math.min(255, args.B))
        });
        this.ws.send(data);
      } else {
        console.warn("WebSocket not connected");
      }
    }
  }

  Scratch.extensions.register(new ESPRGBExtension());
})(Scratch);
