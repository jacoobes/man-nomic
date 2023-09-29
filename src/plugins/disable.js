/**
Partial information: 

 Disables a command entirely, for whatever reasons you may need.

    @author @jacoobes [<@182326315813306368>],@Peter-MJ-Parker [<@371759410009341952>]
    @example

 ```ts
 import { disable } from "../plugins/disable";
 import { commandModule } from "@sern/handler";
 export default commandModule({
  plugins: [ disable() ],
  execute: (ctx) => {
 		//your code here
  }
 })
 ```*/
import { CommandControlPlugin, controller } from "@sern/handler";
function disable(onFail) {
  return CommandControlPlugin(async (ctx, [args]) => {
    if (onFail !== void 0) {
      switch (args) {
        case "text":
          const msg = await ctx.reply(onFail);
          setTimeout(() => {
            msg.delete();
            ctx.message.delete();
          }, 5e3).catch((e) => {
            console.log(e);
          });
          break;
        case "slash":
          await ctx.reply({ content: onFail, ephemeral: true });
          break;
        default:
          break;
      }
    }
    if (onFail === void 0 && args === "slash") {
      onFail = "This command is disabled.";
      await ctx.reply({ content: onFail, ephemeral: true });
    }
    return controller.stop();
  });
}
export {
  disable
};
