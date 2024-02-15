module.exports = {
  config: {
    name: "delmsg",
    version: "1.1",
    author: "farid",
    countDown: 5,
    role: 2,
    category: "𝗕𝗢𝗫 𝗖𝗛𝗔𝗧",
    guide: {
      vi: "",
      en: ""
    }
  },

onStart: function({ api, event, args, getText }) {
if (args[0] == "all") {
 return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("Successfully erase all messages", event.threadID)
 })
}
else return api.getThreadList(1000, null, ["INBOX"], (err, list) => {
 	if (err) throw err;
 	list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ? api.deleteThread(item.threadID) : "");
 	api.sendMessage("Successfully erase all group messages", event.threadID)
 })
                        }
}