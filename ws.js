(function(Scratch) {
  class RGBLedControl {
    getInfo() {
      return {
        id: 'espRGB',
        name: 'ESP RGB LED',
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
      const r = Math.max(0, Math.min(255, args.R));
      const g = Math.max(0, Math.min(255, args.G));
      const b = Math.max(0, Math.min(255, args.B));
      const url = `http://192.168.100.115/set?r=${r}&g=${g}&b=${b}`;
      fetch(url).catch(err => console.log("Error:", err));
    }
  }

  Scratch.extensions.register(new RGBLedControl());
})(Scratch);
