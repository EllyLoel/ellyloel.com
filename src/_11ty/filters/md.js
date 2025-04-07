import { library } from "../plugins/markdown.js";

export default (content = "") => library.render(content);
