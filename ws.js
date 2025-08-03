(function(Scratch) {
  const ws = new WebSocket("ws://192.168.100.115/ws");

  ws.onopen = () => console.log("WebSocket connected");
  ws.onerror = (e) => console.error("WebSocket error:", e);

  class RGBLedWS {
    getInfo() {
      return {
        id: 'espRGBws',
        name: 'ESP RGB WS',
        blocks: [
          {
            opcode: 'setColor',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set color R: [R] G: [G] B: [B]',
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
        const msg = {
          r: Math.max(0, Math.min(255, args.R)),
          g: Math.max(0, Math.min(255, args.G)),
          b: Math.max(0, Math.min(255, args.B))
        };
        ws.send(JSON.stringify(msg));
      } else {
        console.warn("WebSocket not open");
      }
    }
  }

  Scratch.extensions.register(new RGBLedWS());
})(Scratch);
