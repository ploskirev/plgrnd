import { join, dirname } from "path";
import { fileURLToPath } from 'url';
import { copyFileSync, mkdirSync, readdirSync, statSync, readFileSync } from "fs";
import { execSync } from "child_process";
import { sandboxesFolder, templatesFolderName } from "./constants";
import { NO_COMMAND_ERR, handleWarn } from './errors'
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export function parseCommand(): string[] {
  const [, , command, option] = process.argv

  if (command === undefined) {
    throw NO_COMMAND_ERR
  }

  return [command, option]
}

function getSandboxName(lang: string) {
  return lang + '-' + new Date().toLocaleString().replace(', ', '-')
}

export function createSandboxFolder(lang: string) {
  const folderName = getSandboxName(lang)
  const sandboxPath = join(sandboxesFolder, folderName)

  mkdirSync(sandboxPath, { recursive: true })

  return sandboxPath
}

export function copyTemplateContentToSandbox(sandboxPath: string, templateName: string) {
  const templatePath = join(__dirname, templatesFolderName, templateName)

  readdirSync(templatePath)
    .forEach(entity => statSync(join(templatePath, entity)).isFile() && copyFileSync(join(templatePath, entity), join(sandboxPath, entity)))
}

export function openVSCode(sandboxPath: string) {
  execSync(`code ${sandboxPath}`, {})
}

export function openFolder(sandboxPath: string) {
  let command = '';

  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'explorer';
      break;
    default:
      command = 'xdg-open';
      break;
  }

  execSync(`${command} "${sandboxPath}"`)
}

export function openLink(link: string) {
  let command = '';

  switch (process.platform) {
    case 'darwin':
      command = 'open';
      break;
    case 'win32':
      command = 'start';
      break;
    default:
      command = 'xdg-open';
      break;
  }

  execSync(`${command} "${link}"`)
}

export function checkForUpdates() {
  try {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf8'));
    const ltsVersion = execSync(`npm view ${pkg.name} version`, {
      encoding: 'utf-8',
    }).trim()

    if (ltsVersion !== pkg.version.trim()) {
      handleWarn(`Вы используете не актуальную версию утилиты. Ваша версия - ${pkg.version}. LTS версия - ${ltsVersion}.
Рекомендуется обновить sndbx с помощью команды "npm i -g sndbx@${ltsVersion}"`)
      console.log()
    }
  } catch (err) {
    handleWarn(`Не удалось проверить наличие обновлений для sndbx. ${err.message}`)
    console.log()
  }
}
