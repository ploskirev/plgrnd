#!/usr/bin/env node
import { checkForUpdates, parseCommand } from "./utils"
import { handleError } from "./errors"
import { getExecutor } from "./executors"

function run() {
  try {
    checkForUpdates()
    const [command, option] = parseCommand()
    const commandExecutor = getExecutor(command)

    commandExecutor(option)
  } catch (err) {
    handleError(err)
  }
}

run()
