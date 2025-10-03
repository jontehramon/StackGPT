// This plugin was created by DevAfeez 

// Don't Edit Or share without given me credits 

const axios = require('axios');

async function stackgptCommand(sock, chatId, message) {

    try {

        // Extract query from message

        const text = message.message?.conversation || 

                    message.message?.extendedTextMessage?.text || 

                    '';

        const query = text.split(' ').slice(1).join(' ').trim();

        

        // Show help if no query provided

        if (!query) {

            return await sock.sendMessage(chatId, {

                text: `╔══ ✦ *StackGPT AI* ✦ ══╗
      🤖 Powered by DevAfeez
╚═══════════════════════╝

│

├◆ 🤖 Chat with StackGPT AI

│

├◆ 💡 Usage: \`.stackgpt <message>\`

├◆ 💡 Example: \`.stackgpt What features do you have?\`

│

├◆ 📌 *Note:* This AI only discusses StackGPT 

└ ❏`,

                react: { text: '🤖', key: message.key }

            });

        }

        

        // React to show processing

        await sock.sendMessage(chatId, {

            text: `🤖 *Processing your request...*`,

            react: { text: '🤖', key: message.key }

        });

        

        // Craft a query that ensures the AI only talks about StackGPT 

        const systemPrompt = `You are StackGPT, an AI assistant that ONLY discusses topics related to the StackGPT WhatsApp bot, Education, Tech, Programming, Developer. 

You must NEVER discuss AI models, technical details, or anything unrelated to StackGPT.

Always mention 'StackGPT' in your responses.

Always include the GitHub repository link: https://github.com/Coded-bot-code/StackGPT 

Keep all responses focused on StackGPT features, updates, and community.

If asked about anything else, redirect the conversation back to StackGPT.

User question: ${query}

StackGPT response:`;

        

        // Call the API

        const apiUrl = `https://apis.davidcyriltech.my.id/ai/chatbot?query=${encodeURIComponent(systemPrompt)}`;

        const { data } = await axios.get(apiUrl, { timeout: 30000 });

        

        // Validate API response

        if (!data?.success || !data?.result) {

            return await sock.sendMessage(chatId, {

                text: `╔══ ✦ *StackGPT Error* ✦ ══╗
      🤖 Powered by DevAfeez
╚═══════════════════════╝

│

├◆ ❌ StackGPT failed to respond

├◆ 🔍 Please try again later

└ ❏`,

                react: { text: '❌', key: message.key }

            });

        }

        

        // Format the AI response with proper branding

        let response = data.result;

        

        // Ensure the response mentions "StackGPT"

        if (!response.includes("StackGPT")) {

            response = `StackGPT: ${response}`;

        }

        

        // Ensure the response includes the GitHub link

        if (!response.includes("https://github.com/Coded-bot-code/StackGPT")) {

            response += "\n\n🔗 *GitHub Repository:* https://github.com/Coded-bot-code/StackGPT";

        }

        

        // Format the final response

        const aiResponse = `╔══ ✦ *StackGPT Response* ✦ ══╗
      🤖 Powered by DevAfeez
╚═══════════════════════╝

│

├◆ ${response.replace(/\n/g, '\n├◆ ')}

│

├◆ 💡 *StackGPT Features:*

├◆ • Command menus with 100+ commands

├◆ • Movie search & download

├◆ • Group contact export

├◆ • API creation tools

├◆ • And much more!

│

├◆ 🔗 GitHub: https://github.com/Coded-bot-code/StackGPT

└ ❏`;

        

        // Send the AI response with newsletter context

        await sock.sendMessage(chatId, {

            text: aiResponse,

            contextInfo: {

                forwardingScore: 1,

                isForwarded: true,

                forwardedNewsletterMessageInfo: {

                    newsletterJid: '120363401657714060@newsletter',

                    newsletterName: 'AI and Programming Module - StackGPT',

                    serverMessageId: -1

                }

            }

        });

        

        // React to successful completion

        await sock.sendMessage(chatId, {

            text: '✅ Response generated successfully!',

            react: { text: '✅', key: message.key }

        });

    } catch (error) {

        console.error('StackGPT Command Error:', error);

        

        // Create error box

        const errorBox = `╔══ ✦ *StackGPT AI Error* ✦ ══╗
      🤖 Powered by DevAfeez
╚═══════════════════════╝

│

├◆ ❌ Failed to communicate with AI

├◆ 🔍 Error: ${error.message.substring(0, 50)}...

├◆ 💡 Please try again later

└ ❏`;

        

        await sock.sendMessage(chatId, {

            text: errorBox,

            react: { text: '❌', key: message.key }

        });

    }

}

module.exports = stackgptCommand;