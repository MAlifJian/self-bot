const {WAConnection} = require('@adiwajshing/baileys');
const fs = require('fs');
const {run} = require('./eval.js');
const prefix = '$'
async function start(){
const alf = new WAConnection();

await alf.loadAuthInfo ('./session.json');
alf.on('open',()=>{
const authInfo = alf.base64EncodedAuthInfo();
fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'));
})

alf.on('chat-update',(cht) =>{
if (!cht.hasNewMessage) return;
cht = cht.messages.all()[0];
global.prefix
const type = Object.keys(cht.message)[0]
body = (type === 'conversation' && cht.message.conversation.startsWith(prefix)) ? cht.message.conversation : (type == 'imageMessage') && cht.message.imageMessage.caption.startsWith(prefix) ? cht.message.imageMessage.caption : (type == 'videoMessage') && cht.message.videoMessage.caption.startsWith(prefix) ? cht.message.videoMessage.caption : (type == 'extendedTextMessage') && cht.message.extendedTextMessage.text.startsWith(prefix) ? cht.message.extendedTextMessage.text : '';
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
console.log(cht);
switch(command){
case 'eval' :
let code = body.trim().split(" ").slice(1);
console.log(code);
run(alf, cht, code);
break;
}
})
alf.connect();
}

start().catch(err => console.log('Unexpected Error:' + err));