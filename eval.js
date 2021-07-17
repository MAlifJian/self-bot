const fetch = require("node-fetch");
const cheerio = require("cheerio");
const {
  MessageType,
  Mimetype,
  WAMessageProto,
} = require("@adiwajshing/baileys");


module.exports = {
  name: "eval",

  aliases: ["e"],

  /**

	 * @param {Client} conn	 * @param {Message} m

	 * @param {String[]} args

	 */

  run: async (conn, m, args) => {
    let code = args.join(" ");
    const quoted = JSON.parse(JSON.stringify(m).replace('quotedM','m')).message.extendedTextMessage.contextInfo;
    try {
      let evaled;

      if (!code) return reply(m.key.remoteJid, "No Javascript code", m);

      if (code.includes("--async") && code.includes("--silent")) {
        code = code.replace("--async", "").replace("--silent", "");

        return await eval(`(async () => { ${code} })()`);
      } else if (code.includes("--async")) {
        code = code.replace("--async", "");

        evaled = await eval(`(async () => { ${code} })()`);
      } else if (code.includes("--silent")) {
        code = code.replace("--silent", "");

        return await eval(code);
      } else evaled = await eval(code);

      if (typeof evaled !== "string") evaled = require("util").format(evaled);

      let output = clean(evaled);

      reply(m.key.remoteJid, output, m);
    } catch (e) {
      let outerr = clean(e);

      reply(m.key.remoteJid, `Err: ${outerr}`, m);
    }

    function clean(code) {
      if (typeof code === "string")
        return code

          .replace(/`/g, `\`${String.fromCharCode(8203)}`)

          .replace(/@/g, `@${String.fromCharCode(8203)}`);
      else return code;
    }
    function reply(jid, text ,chat){
	return conn.sendMessage(jid,text,MessageType.text,{quoted : chat});
}
  },
};