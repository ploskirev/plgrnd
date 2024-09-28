import { readdirSync, rmSync, statSync, readFileSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'
import { COMMAND_CLEAR, COMMAND_HELP, OPTION_DOCS, LANG_GO, LANG_JS, LANG_NODE, COMMAND_OPEN, goDocsLink, jsDocsLink, sandboxesFolder, COMMAND_VERSION, COMMAND_SHORT_VERSION } from "./constants"
import { copyTemplateContentToSandbox, createSandboxFolder, openFolder, openLink, openVSCode, __dirname } from "./utils"


function javaScriptExecutor(option?: string) {
  if (option === OPTION_DOCS) {
    openLink(jsDocsLink)
    return
  }

  const sandboxPath = createSandboxFolder(LANG_JS)

  copyTemplateContentToSandbox(sandboxPath, LANG_JS)
  try {
    openVSCode(sandboxPath)
  } catch {
    openFolder(sandboxPath)
  }
}

function goExecutor(option?: string) {
  if (option === OPTION_DOCS) {
    openLink(goDocsLink)
    return
  }
  const sandboxPath = createSandboxFolder(LANG_GO)

  copyTemplateContentToSandbox(sandboxPath, LANG_GO)
  try {
    openVSCode(sandboxPath)
  } catch {
    openFolder(sandboxPath)
  }
}

function clearExecutor() {
  readdirSync(sandboxesFolder)
    .forEach(entity => statSync(join(sandboxesFolder, entity)).isDirectory() && rmSync(join(sandboxesFolder, entity), { recursive: true, force: true }))
}

function openExecutor() {
  openFolder(sandboxesFolder)
}

function versionExecutor() {
  const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));

  console.log(pkg.name, `v${pkg.version}`)
}

function helpExecutor() {
  console.log(`Утилита позволяет развернуть песочницу и открыть ее в VSCode с помощью одной команды.
Поддерживаются Go и JavaScript.
Также можно открыть документацию к выбранному языку с помощью опции для команд - docs.
${chalk.gray('* Чтобы песочница открылась в VSCode, необходимо, чтобы он был добавлен в PATH.\nДля этого в VSCode нажмите Cmd + Shift + P и выберите пункт "Shell Command: Install \'code\' command in PATH".\nВ противном случае песочница откроется в finder/explorer.')}`)
  console.log()
  console.log('Список поддерживаемых команд')
  console.log('============================')
  console.log(chalk.bold(' sndbx go '), ' - Разворачивает песочницу для Go')
  console.log(chalk.bold(' sndbx js / node '), ' - Разворачивает песочницу для JavaScript')
  console.log(chalk.bold(' sndbx go docs '), ' - Открывает документацию по Go (Go tour)')
  console.log(chalk.bold(' sndbx js docs '), ' - Открывает документацию по JavaScript (MDN)')
  console.log(chalk.bold(' sndbx open '), ' - открывает папку с созданными песочницами')
  console.log(chalk.bold(' sndbx clear '), ' - Удаляет все созданные песочницы')
  console.log(chalk.bold(' sndbx version / -v '), ' - Отображает версию утилиты')
  console.log(chalk.bold(' sndbx help '), ' - ¯\\_(ツ)_/¯')
}

export function getExecutor(command: string) {
  switch (command) {
    case LANG_GO:
      return goExecutor
    case LANG_JS:
    case LANG_NODE:
      return javaScriptExecutor
    case COMMAND_OPEN:
      return openExecutor
    case COMMAND_CLEAR:
      return clearExecutor
    case COMMAND_VERSION:
    case COMMAND_SHORT_VERSION:
      return versionExecutor
    case COMMAND_HELP:
      return helpExecutor
    default:
      return helpExecutor
  }
}
