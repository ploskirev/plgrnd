import chalk from 'chalk'

export const NO_COMMAND_ERR = new Error('Can\'t find command. Format command is \'sndbx go\' or \'sndbx js\' for example')
export const WRONG_COMMAND_ERR = new Error('Wrong command. Use \'sndbx help\' to get all available commands')

export function handleError(err: Error) {
  console.log(`${chalk.bold.bgRed(' ERROR ')} ${err.message}`)
}

export function handleWarn(text: string) {
  console.log(`${chalk.bgYellow.gray.bold(' WARN ')} ${text}`)
}
