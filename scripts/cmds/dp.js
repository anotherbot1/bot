module.exports = {
	config: {
		name: "dp",
    aliases: ["pfp"],
		version: "1.0",
		author: "OtinXSandip",
		countDown: 5,
		role: 0,
		shortDescription: "pfp image",
		longDescription: "pfp image",
		category: "𝗜𝗠𝗔𝗚𝗘",
		guide: {
			en: "   {pn} @tag"
		}
	},

	onStart: async function ({ event, message, usersData, args, getLang }) {
    let avt;
		const uid1 = event.senderID;
		const uid2 = Object.keys(event.mentions)[0];
		if(event.type == "message_reply"){
      avt = await usersData.getAvatarUrl(event.messageReply.senderID)
    } else{
      if (!uid2){avt =  await usersData.getAvatarUrl(uid1)
              } else{avt = await usersData.getAvatarUrl(uid2)}}


		message.reply({
			body:"",
			attachment: await global.utils.getStreamFromURL(avt)
	})
  }
};