(function(Scratch) {
  const ws = new WebSocket("ws://192.168.100.115:81");

  class RGBExtension {
    getInfo() {
      return {
        id: "espwsrgb",
        name: "ESP RGB WS",
        blocks: [
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set color R: [R] G: [G] B: [B]",
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            }
          }
        ]
      };
    }

    setColor(args) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          r: Math.max(0, Math.min(255, args.R)),
          g: Math.max(0, Math.min(255, args.G)),
          b: Math.max(0, Math.min(255, args.B))
        }));
      } else {
        console.warn("WebSocket not connected");
      }
    }
  }

  Scratch.extensions.register(new RGBExtension());
})(Scratch);
