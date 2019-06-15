import { existsSync } from "fs"
import { join } from "path"
import { exec as oldSchoolExec } from "child_process"
import chokidar from "chokidar"
import Ora from "ora"
import { promisify } from "util"

import { generateTypeDictionary } from "./generate-type-dictionary"
import { buildIcons } from "./build-icons"

const exec = promisify(oldSchoolExec)
const spinner = Ora()
const formatPerfTimeStamp = (ms: number) =>
  ms > 1000 ? (ms / 1000 > 60 ? `⚠️  ${(ms / (1000 * 60)).toFixed(2)}m` : `${(ms / 1000).toFixed(2)}s`) : `${ms}ms`

const doWeHaveLib = () => existsSync(join(__dirname, "../lib"))
const generateTypeDeclarations = () =>
  new Promise(async (resolve, reject) => {
    try {
      await exec(`${join(__dirname, "../node_modules/.bin/rimraf")} ${join(__dirname, "../.tsbuildinfo")}`)
      await exec(`${join(__dirname, "../node_modules/.bin/tsc")} -d`)
      resolve()
    } catch (e) {
      reject(e)
    }
  })

const step1 = async () => {
  const startTime = new Date().getTime()
  spinner.start("Generating Icons...")
  await buildIcons()
  spinner.succeed(`Generated Icons. Took ${formatPerfTimeStamp(new Date().getTime() - startTime)}.`)

  if (!doWeHaveLib()) {
    const startTsc = new Date().getTime()
    spinner.info("We don't have type declarations yet.")
    spinner.start("Generating Type Declarations...")
    await generateTypeDeclarations()
    spinner.succeed(`Generated Type Declarations. Took ${formatPerfTimeStamp(new Date().getTime() - startTsc)}.`)
  }

  const startCodegenForMonacoTime = new Date().getTime()
  spinner.start("Generating Type Dictionary for Monaco")
  await generateTypeDictionary()
  spinner.succeed(
    `Generated Type Dictionary for Monaco. Took ${formatPerfTimeStamp(
      new Date().getTime() - startCodegenForMonacoTime,
    )}.`,
  )
}

const startStyleguidist = () =>
  new Promise((resolve, reject) => {
    spinner.start("Starting react-styleguidist...")

    const startSG = new Date().getTime()
    const executor = oldSchoolExec(join(__dirname, "../node_modules/.bin/styleguidist server"))
    let isServerRunning = false

    executor.stdout.on("data", d => {
      if (d === "\n") {
        return
      }
      if (d.includes("Compiled successfully!")) {
        const successMsg = `Styleguide available at http://localhost:6060/. Took ${formatPerfTimeStamp(
          new Date().getTime() - startSG,
        )}`
        isServerRunning = true
        resolve(successMsg)
        spinner.succeed(successMsg)
        return
      }
      spinner.text = `${!isServerRunning ? "Starting" : ""} react-styleguidist${!isServerRunning ? "... " : ":"}\n${d}`
    })

    executor.on("error", e => {
      reject(e)
    })

    if (isServerRunning) {
      executor.stdout.pipe(process.stdout)
      executor.stderr.pipe(process.stderr)
    }
  })

const startWatchers = () =>
  new Promise(async (resolve, reject) => {
    try {
      let isSuccess = false
      spinner.start("Starting watchers...")
      const startWatchersTime = new Date().getTime()
      // Watch paths
      chokidar.watch(`${join(__dirname, "../lib")}/**/*.d.ts`).on("change", generateTypeDictionary)
      chokidar.watch([`${join(__dirname, "../icons")}/**.svg`]).on("change", buildIcons)

      // Watch source code
      const srcWatcher = oldSchoolExec(join(__dirname, "../node_modules/.bin/tsc -d -w"))
      srcWatcher.on("error", process.stderr.write)
      srcWatcher.stderr.pipe(process.stderr)
      srcWatcher.stdout.on("data", data => {
        if (data.includes("Found 0 errors. Watching for file changes.")) {
          isSuccess = true
          const watcherStartSuccessMessage = "Watching Type Declarations and Icons."
          resolve(watcherStartSuccessMessage)
          spinner.succeed(
            `${watcherStartSuccessMessage}. Took ${formatPerfTimeStamp(new Date().getTime() - startWatchersTime)}.`,
          )
          return
        }

        if (!isSuccess) {
          spinner.text = data
        }

        if (isSuccess) {
          process.stdout.write(data)
        }
      })
    } catch (e) {
      reject(e)
    }
  })

const step2 = async () => {
  try {
    const watcherStartSuccessMessage = await startWatchers()

    // Start Styleguide
    await startStyleguidist()
  } catch (e) {
    spinner.fail(e)
  }
}
;(async () => {
  await step1()
  step2()
})()
