import { homedir } from 'os'
import { join } from 'path'

export const LANG_GO = 'go'
export const LANG_JS = 'js'
export const LANG_NODE = 'node'
export const COMMAND_HELP = 'help'
export const COMMAND_CLEAR = 'clear'
export const COMMAND_OPEN = 'open'
export const COMMAND_VERSION = 'version'
export const COMMAND_SHORT_VERSION = '-v'

export const OPTION_DOCS = 'docs'

export const templatesFolderName = 'templates'
export const sandboxesFolder = join(homedir(), '.sndbx', 'sandboxes')

export const jsDocsLink = 'https://developer.mozilla.org/'
export const goDocsLink = 'https://go.dev/tour/welcome/1'
