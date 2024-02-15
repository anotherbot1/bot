const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ ᏬᏃᎯᎷᎯᏦᎨ ]";
/** 
* @author NTKhang
* @author: do not delete it
* @message if you delete or edit it you will get a global ban
*/

module.exports = {
	config: {
		name: "helpp",
		version: "1.12",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		shortDescription: {
			vi: "Xem cách dùng lệnh",
			en: "View command usage"
		},
		longDescription: {
			vi: "Xem cách sử dụng của các lệnh",
			en: "View command usage"
		},
		category: "info",
		guide: {
			vi: "{pn} [để trống | <số trang> | <tên lệnh>]",
			en: "{pn} [empty | <page number> | <command name>]"
		},
		priority: 1
	},

	langs: {
		vi: {
			help: "╭─────────────⭓\n%1\n├─────⭔\n│ Trang [ %2/%3 ]\n│ Hiện tại bot có %4 lệnh có thể sử dụng\n│ » Gõ %5help <số trang> để xem danh sách các lệnh\n│ » Gõ %5help để xem chi tiết cách sử dụng lệnh đó\n├────────⭔\n│ %6\n╰─────────────⭓",
			help2: "%1├───────⭔\n│ » Hiện tại bot có %2 lệnh có thể sử dụng\n │ » Gõ %3help <tên lệnh> để xem chi tiết cách sử dụng lệnh đó\n│ %4\n╰─────────────⭓",
			commandNotFound: "Lệnh \"%1\" không tồn tại",
			getInfoCommand: "╭── NAME ────⭓\n│ %1\n├── INFO\n│ Mô tả: %2\n│ Các tên gọi khác: %3\n│ Các tên gọi khác trong nhóm bạn: %4\n│ Version: %5\n│ Role: %6\n│ Thời gian mỗi lần dùng lệnh: %7s\n│ Author: %8\n├── Usage\n│ %9\n├── Notes\n│ Nội dung bên trong <XXXXX> là có thể thay đổi\n│ Nội dung bên trong [a|b|c] là a hoặc b hoặc c\n╰──────⭔",
			doNotHave: "Không có",
			roleText0: "0 (Tất cả người dùng)",
			roleText1: "1 (Quản trị viên nhóm)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, tất cả người dùng)",
			roleText1setRole: "1 (set role, quản trị viên nhóm)",
			pageNotFound: "Trang %1 không tồn tại"
		},
		en: {
			help:   `
╭────────────────/
│ ╭─────────────/
│ ├───✧ 𝚋𝚘𝚡 𝚌𝚑𝚊𝚝
│ │⭓
│ │⭓
├─│⭓
│ │⭓
│ │⭓
│ │⭓
│ ╰──────────────/
│ ╭─────────────/
│ ├───✧
│ │
│ │
├─│
│ │
│ │
│ │
│ ╰──────────────/
│ ╭─────────────/
│ ├───✧
│ │
│ │
├─│
│ │
│ │
│ │
│ ╰─────────────/
│ ╭────────────/
│ ├───✧
│ │
│ │
├─│
│ │
│ │
│ │
│ ╰─────────────/`,
			help2: "%1├───────⭔\n│ » Currently, the bot has %2 commands that can be used\n│ » Type %3help <command name> to view the details of how to use that command\n│ %4\n╰─────────────⭓",
			commandNotFound: "Command \"%1\" does not exist",
			getInfoCommand: "─── NAME ────⭓\n» %1\n─── INFO\n» Description: %2\n\─── Usage\n%9\n───────⭔",
			doNotHave: "Do not have",
			roleText0: "0 (All users)",
			roleText1: "1 (Group administrators)",
			roleText2: "2 (Admin bot)",
			roleText0setRole: "0 (set role, all users)",
			roleText1setRole: "1 (set role, group administrators)",
			pageNotFound: "Page %1 does not exist"
		}
	},

  onStart: async function ({ message, args, event, threadsData, getLang, role }) {
          const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
          let customLang = {};
          const pathCustomLang = path.normalize(`${process.cwd()}/languages/cmds/${langCode}.js`);
          if (fs.existsSync(pathCustomLang))
              customLang = require(pathCustomLang);

          const { threadID } = event;
          const threadData = await threadsData.get(threadID);
          const prefix = getPrefix(threadID);
          let sortHelp = threadData.settings.sortHelp || "name";
          if (!["category", "name"].includes(sortHelp))
              sortHelp = "category";
          const commandName = (args[0] || "").toLowerCase();
          const command = commands.get(commandName) || commands.get(aliases.get(commandName));

          const folderPath = 'scripts/cmds/help';

          if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
          }

          const files = await fs.readdir(folderPath);

          const attachments = [];

          for (const file of files) {
          const filePath = path.join(folderPath, file);
          const fileStream = fs.createReadStream(filePath);
          attachments.push(fileStream);
          }

          const messageContent = {
          attachment: attachments
          };

          if (!command && !args[0] || !isNaN(args[0])) {
              const arrayInfo = [];
              let msg = "";
            if (sortHelp == "name") {
  const page = parseInt(args[0]) || 1;
  const numberOfOnePage = 30;
  for (const [name, value] of commands) {
      if (value.config.role > 1 && role < value.config.role)
          continue;
      let describe = name;
      let shortDescription;
      const shortDescriptionCustomLang = customLang[name]?.shortDescription;
      if (shortDescriptionCustomLang != undefined)
          shortDescription = checkLangObject(shortDescriptionCustomLang, langCode);
      else if (value.config.shortDescription)
          shortDescription = checkLangObject(value.config.shortDescription, langCode);
      if (shortDescription)
          describe += `: ${cropContent(shortDescription.charAt(0).toUpperCase() + shortDescription.slice(1))}`;
      arrayInfo.push({
          data: describe,
          priority: value.priority || 0
      });
  }

  arrayInfo.sort((a, b) => a.data - b.data);
  arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1);
  const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
  if (page < 1 || page > totalPage)
      return message.reply(getLang("pageNotFound", page));

  const returnArray = allPage[page - 1] || [];
  const startNumber = (page - 1) * numberOfOnePage + 1;
  msg += (returnArray || []).reduce((text, item, index) => text += `│ ${index + startNumber}${index + startNumber < 10 ? " " : ""}. ${item.data}\n`, '').slice(0, -1);
  await message.reply({ body: getLang("help", msg, page, totalPage, commands.size, prefix, doNotDelete), attachment: messageContent.attachment });
  }
       //Sorthelp Category
    else if (sortHelp == "category") {
      let categoryCommands = new Map();

      for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role) {
              continue;
          }

          const categoryName = (value.config.category || "No Category").toUpperCase();
          const circularSymbol = "❀";
          if (!categoryCommands.has(categoryName)) {
              categoryCommands.set(categoryName, []);
          }
         categoryCommands.get(categoryName).push(`${circularSymbol}${name}`);
      }

      const sortedCategories = Array.from(categoryCommands.keys()).sort();
      let msg = "";
      for (const category of sortedCategories) {
          const commands = categoryCommands.get(category);
          msg += `➠  ⌈ ${category} ⌋\n${commands.join(", ")}\n\n`;
      }

      await message.reply({ body: getLang("help2", msg, commands.size, prefix, doNotDelete), attachment: messageContent.attachment });
  }
          }
          else if (!command && args[0]) {
              return message.reply(getLang("commandNotFound", args[0]));
          }
          else {
              const formSendMessage = {};
              const configCommand = command.config;

              let guide = configCommand.guide?.[langCode] || configCommand.guide?.["en"];
              if (guide == undefined)
                  guide = customLang[configCommand.name]?.guide?.[langCode] || customLang[configCommand.name]?.guide?.["en"];

              guide = guide || {
                  body: ""
              };
              if (typeof guide == "string")
                  guide = { body: guide };
              const guideBody = guide.body
                  .replace(/\{prefix\}|\{p\}/g, prefix)
                  .replace(/\{name\}|\{n\}/g, configCommand.name)
                  .replace(/\{pn\}/g, prefix + configCommand.name);

              const aliasesString = configCommand.aliases ? configCommand.aliases.join(", ") : getLang("doNotHave");
              const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(", ") : getLang("doNotHave");

              let roleOfCommand = configCommand.role;
              let roleIsSet = false;
              if (threadData.data.setRole?.[configCommand.name]) {
                  roleOfCommand = threadData.data.setRole[configCommand.name];
                  roleIsSet = true;
              }

              const roleText = roleOfCommand == 0 ?
                  (roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
                  roleOfCommand == 1 ?
                      (roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
                      getLang("roleText2");

              const author = configCommand.author;
              const descriptionCustomLang = customLang[configCommand.name]?.longDescription;
              let description = checkLangObject(configCommand.longDescription, langCode);
              if (description == undefined)
                  if (descriptionCustomLang != undefined)
                      description = checkLangObject(descriptionCustomLang, langCode);
                  else
                      description = getLang("doNotHave");

              let sendWithAttachment = false; // check subcommand need send with attachment or not

              if (args[1]?.match(/^-g|guide|-u|usage$/)) {
                  formSendMessage.body = getLang("onlyUsage", guideBody.split("\n").join("\n"));
                  sendWithAttachment = true;
              }
              else if (args[1]?.match(/^-a|alias|aliase|aliases$/))
                  formSendMessage.body = getLang("onlyAlias", aliasesString, aliasesThisGroup);
              else if (args[1]?.match(/^-r|role$/))
                  formSendMessage.body = getLang("onlyRole", roleText);
              else if (args[1]?.match(/^-i|info$/))
                  formSendMessage.body = getLang("onlyInfo", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "");
              else {
                  formSendMessage.body = getLang("getInfoCommand", configCommand.name, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "", `${guideBody.split("\n").join("\n")}`);
                  sendWithAttachment = true;
              }

              if (sendWithAttachment && guide.attachment) {
                  if (typeof guide.attachment == "object" && !Array.isArray(guide.attachment)) {
                      const promises = [];
                      formSendMessage.attachment = [];

                      for (const keyPathFile in guide.attachment) {
                          const pathFile = path.normalize(keyPathFile);

                          if (!fs.existsSync(pathFile)) {
                              const cutDirPath = path.dirname(pathFile).split(path.sep);
                              for (let i = 0; i < cutDirPath.length; i++) {
                                  const pathCheck = `${cutDirPath.slice(0, i + 1).join(path.sep)}${path.sep}`; // create path
                                  if (!fs.existsSync(pathCheck))
                                      fs.mkdirSync(pathCheck); // create folder
                              }
                              const getFilePromise = axios.get(guide.attachment[keyPathFile], { responseType: 'arraybuffer' })
                                  .then(response => {
                                      fs.writeFileSync(pathFile, Buffer.from(response.data));
                                  });

                              promises.push({
                                  pathFile,
                                  getFilePromise
                              });
                          }
                          else {
                              promises.push({
                                  pathFile,
                                  getFilePromise: Promise.resolve()
                              });
                          }
                      }

                      await Promise.all(promises.map(item => item.getFilePromise));
                      for (const item of promises)
                          formSendMessage.attachment.push(fs.createReadStream(item.pathFile));
                  }
              }

              return message.reply(formSendMessage);
          }
      },

   onChat: async function ({ message, event }) {

      const isAdmin = config.GoatBot.includes(event.senderID);

      if (event.body && event.body.toLowerCase() === "help file" && isAdmin) {
          const fileUrl = event.messageReply && event.messageReply.attachments[0].url;

          if (!fileUrl) {
              return message.reply("❌ No valid attachment found.");
          }

          const folderPath = 'scripts/cmds/help';

          if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
          }

          try {
              const files = await fs.readdir(folderPath);
              for (const file of files) {
                  await fs.unlink(path.join(folderPath, file));
              }
          } catch (error) {
              return message.reply("❌ Error clearing folder: " + error);
          }

          const response = await axios.get(fileUrl, {
              responseType: "arraybuffer",
              headers: {
                  'User-Agent': 'axios'
              }
          });

          const contentType = response.headers['content-type'];
          if (contentType.includes('image')) {
              const imagePath = path.join(folderPath, 'image.jpg');
              fs.writeFileSync(imagePath, Buffer.from(response.data, 'binary'));
          } else if (contentType.includes('video') || contentType.includes('gif')) {
              const ext = contentType.includes('video') ? '.mp4' : '.gif';
              const mediaPath = path.join(folderPath, 'media' + ext);
              fs.writeFileSync(mediaPath, Buffer.from(response.data, 'binary'));
          } else {
              return message.reply("❌ Invalid attachment format. Reply only with an image, video, or gif");
          }

          message.reply("✅ File saved successfully.");
      } else if (event.body && event.body.toLowerCase() === "help reset" && isAdmin) {
          try {
              const folderPath = 'scripts/cmds/help';

              if (fs.existsSync(folderPath)) {
                  const files = await fs.readdir(folderPath);
                  for (const file of files) {
                      await fs.unlink(path.join(folderPath, file));
                  }
                  message.reply("✅ Folder cleared successfully.");
              } else {
                  return message.reply("❌ Folder does not exist.");
              }
          } catch (error) {
              return message.reply("❌ Error clearing folder: " + error);
          }
      } else if (event.body && event.body.toLowerCase() === "help reset" && !isAdmin) {
          return message.reply("❌ Only admins can remove the file.");
      }
  }
  };

  function checkLangObject(data, langCode) {
      if (typeof data == "string")
          return data;
      if (typeof data == "object" && !Array.isArray(data))
          return data[langCode] || data.en || undefined;
      return undefined;
  }

  function cropContent(content, max) {
      if (content.length > max) {
          content = content.slice(0, max - 3);
          content = content + "...";
      }
      return content;
  }