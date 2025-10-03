// This plugin was created by StackGPT 
// Don't Edit Or share without given me credits 

const settings = require('../settings'); // Added settings import

async function devCommand(sock, chatId, message) {
    try {
        // Extract user name
        const pushname = message.pushName || "there";
        
        // Developer info
        const devInfo = {
            name: "DevAfeez",
            whatsapp: "wa.me/2348029214393",
            youtube: "https://youtube.com/@DevAfeez",
            image: "https://files.catbox.moe/71ds56.jpg"
        };
        
        // Format the developer message with animation effects
        const devMessage = `╔══ ✦ *Dev Info* ✦ ══╗
╚═══════════════════════╝
│
├◆ 👋 Hello ${pushname}
├◆ I'm *DevAfeez*, creator and developer of StackGPT.
│
├◆ *MY INFO:*
├◆ ────────────────────
├◆ 🪀 *Name:* DevAfeez 
├◆ 🪀 *WhatsApp:* ${devInfo.whatsapp}
├◆ 🪀 *YouTube:* ${devInfo.youtube}
│
├◆ *Bot Details:*
├◆ 📦 *Bot Name:* StackGPT 
├◆ 🌐 *Version:* ${settings.version || '1.0.0'}
├◆ 🛠️ *Features:* 100+ Commands
│
├◆ *Support Me:*
├◆ ❤️ Subscribe to my YouTube channel
├◆ 💬 Join my WhatsApp community
│
├◆ ✨ *Thank you for using StackGPT!*
└ ❏
‎
${'='.repeat(30)}
💡 *Type .help {command} for command list*
${'='.repeat(30)}`;

        // Send the developer info with animated image
        await sock.sendMessage(chatId, {
            image: { url: devInfo.image },
            caption: devMessage,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                mentionedJid: [message.key.remoteJid],
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363401657714060@newsletter',
                    newsletterName: 'AI and Programming Module - StackGPT',
                    serverMessageId: -1
                },
                externalAdReply: {
                    title: 'StackGPT Bot',
                    body: 'Created by DevAfeez',
                    thumbnailUrl: devInfo.image,
                    mediaType: 1,
                    renderSmallerThumbnail: true,
                    showAdAttribution: true,
                    mediaUrl: devInfo.youtube,
                    sourceUrl: devInfo.youtube
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Dev Command Error:', error);
        
        // Create error box
        const errorBox = `╔══ ✦ *Dev Info Error* ✦ ══╗
╚═══════════════════════╝
│
├◆ ❌ Failed to show developer information
├◆ 🔍 Error: ${error.message.substring(0, 50)}...
└ ❏`;
        
        await sock.sendMessage(chatId, {
            text: errorBox,
            react: { text: '❌', key: message.key }
        });
    }
}

module.exports = devCommand;