export default (url) => url.split(/[#?]/)[0].split(".").pop().trim();
