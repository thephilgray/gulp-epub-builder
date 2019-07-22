const dateFormat = require("date-fns/format");

const BUILDS_PATH = "build";
const SOURCE_PATH = "src";
const CONTENT_DIRNAME = "OEBPS";
const CONTENT_PATH = `${BUILDS_PATH}/${CONTENT_DIRNAME}`;
const DATA_PATH = `${SOURCE_PATH}/data`;
const PAGE_TEMPLATES_PATH = `${SOURCE_PATH}/pages`;
const PACKAGE_TEMPLATE_PATH = `${SOURCE_PATH}/templates/content.pug`;
const METADATA_PATH = `${DATA_PATH}/metadata.json`;
const PAGEDATA_PATH = `${DATA_PATH}/pages.json`;
const STYLESHEET_PATHS = [`${SOURCE_PATH}/**/styles.less`];
const SCRIPT_PATHS = [`${SOURCE_PATH}/**/*.js`, `!${SOURCE_PATH}/**/lib/*.js`];
const ALL_PUG = `${SOURCE_PATH}/**/*.pug`;
const ALL_LESS = `${SOURCE_PATH}/**/*.less`;
const ALL_JS = `${SOURCE_PATH}/**/*.js`;
const ALL_DATA = [`${SOURCE_PATH}/**/*.json`, `${SOURCE_PATH}/**/*.yaml`];
const MODIFIED_DATE = dateFormat(new Date(), `YYYY-MM-DDThh:mm:ss`) + "Z";
const IDENTIFIER_NAMESPACE = "30948b9b-43c7-4771-a267-dea119c6238b";

const EXTENSIONS_MAP = [
  { name: "js", mediaType: "application/javascript" },
  { name: "css", mediaType: "text/css" },
  { name: "xhtml", mediaType: "application/xhtml+xml" },
  { name: "jpg", mediaType: "image/jpeg" },
  { name: "jpeg", mediaType: "image/jpeg" },
  { name: "png", mediaType: "image/png" },
  { name: "gif", mediaType: "image/gif" },
  { name: "svg", mediaType: "image/svg+xml" },
  { name: "ttf", mediaType: "application/font-sfnt" },
  { name: "otf", mediaType: "application/font-sfnt" },
  { name: "ttc", mediaType: "application/font-sfnt" },
  { name: "woff", mediaType: "application/font-woff" },
  { name: "woff2", mediaType: "font/woff2" },
  { name: "vtt", mediaType: "text/vtt" },
  { name: "xml", mediaType: "application/xml" },
  { name: "mp4", mediaType: "video/mp4" },
  { name: "mp3", mediaType: "audio/mp3" },
  { name: "m4a", mediaType: "audio/m4a" }
];

const MEDIA_IGNORES = ["js", "css", "xhtml", "xml"];
const MEDIA_PATHS = `${SOURCE_PATH}/**/*.{${EXTENSIONS_MAP.filter(
  ext => MEDIA_IGNORES.indexOf(ext.name) === -1
)
  .map(ext => ext.name)
  .join(",")}}`;

module.exports = {
  BUILDS_PATH,
  SOURCE_PATH,
  CONTENT_PATH,
  PAGE_TEMPLATES_PATH,
  PACKAGE_TEMPLATE_PATH,
  METADATA_PATH,
  PAGEDATA_PATH,
  STYLESHEET_PATHS,
  SCRIPT_PATHS,
  MEDIA_IGNORES,
  MEDIA_PATHS,
  ALL_PUG,
  ALL_LESS,
  ALL_JS,
  ALL_DATA,
  EXTENSIONS_MAP,
  MODIFIED_DATE,
  IDENTIFIER_NAMESPACE
};
