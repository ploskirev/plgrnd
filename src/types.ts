import { COMMAND_CLEAR, COMMAND_HELP, COMMAND_OPEN, LANG_GO, LANG_JS, LANG_NODE } from "./constants";

export type TCommands = typeof LANG_JS | typeof LANG_NODE | typeof LANG_GO | typeof COMMAND_CLEAR | typeof COMMAND_HELP | typeof COMMAND_OPEN
