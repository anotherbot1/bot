import { IPangolinRun } from "src/types/type.pangolin-handle";

export default class CheckttCommand {
  static config = {
    name: "poststory",
    version: "1.0.0",
    author: "Lợi",
    category: "𝗢𝗪𝗡𝗘𝗥",
    permission: 2,
    description: {
      vi: "Đăng story tài khoản bot",
      en: "Post a story on a bot account",
    },
    guide: {
      vi: "[prefix]poststory",
      en: "[prefix]poststory",
    },
  };

  static message = {
    vi: {
      info: "Đã đăng thành công",
    },
    en: {
      info: "Posted successfully",
    },
  };

  constructor(private client) {}

  async run({ api, event, args, getLang }: IPangolinRun) {
    try {
      const caption = (event.body as string).split(args[0])[1];
      await api.postTextStory(caption, "233490655168261", "525779004528357"); //tạm thời fix cứng font và background
      api.sendMessage(getLang("info"), event.threadID);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  }
}
