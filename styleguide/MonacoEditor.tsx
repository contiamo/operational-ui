import { editor as monacoEditor, KeyCode, KeyMod, Uri } from "monaco-editor"
import React, { Dispatch, useCallback, useEffect, useRef } from "react"
import { styled, useUniqueId } from "../src"

interface MonacoEditorProps {
  component: string
  code: string
  onChange: Dispatch<string>
}

const MonacoContainer = styled("div")`
  margin-bottom: ${({ theme }) => theme.space.big}px;
`

const MonacoEditor: React.FC<MonacoEditorProps> = ({ component, code, onChange }) => {
  const model = useRef<monacoEditor.ITextModel | null>(null)
  const monacoInstance = useRef<monacoEditor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef(monacoEditor)
  const create = useCallback(monacoRef.current.createModel, [])
  const uniqueId = useUniqueId()
  const currentModelUri = Uri.parse(`file:///${component}-${uniqueId}.tsx`)
  const $monacoContainer = useRef<HTMLDivElement>(null)

  // Create a model from the README's example before mount.
  useEffect(() => {
    const collectGarbage = () => {
      // If it already exists, dispose of it.
      if (model.current) {
        model.current.dispose()
      }
    }

    try {
      // Monaco throws if you try to create the same model twice
      model.current = create(code, "typescript", currentModelUri)
    } catch {
      collectGarbage()
    }

    return collectGarbage
  }, [])

  // Mount the editor
  useEffect(() => {
    /*
      If the `monacoContainer` has a current value,
      AND we have a model
    */
    if ($monacoContainer.current && model.current) {
      // Store the instance
      monacoInstance.current = monacoRef.current.create($monacoContainer.current, {
        model: monacoEditor.getModel(currentModelUri),
        minimap: {
          enabled: false,
        },
        lineNumbers: "off",
        scrollBeyondLastLine: false,
      })
    }
  }, [])

  // Auto-size the height of the editor
  useEffect(() => {
    if ($monacoContainer.current && model.current && monacoInstance.current) {
      $monacoContainer.current.style.height = `${model.current.getLineCount() * 19}px`
      monacoInstance.current.layout()
    }
  }, [$monacoContainer.current])

  // Scroll to top and adjust height as users type
  useEffect(() => {
    if (monacoInstance.current) {
      monacoInstance.current.onKeyUp(() => {
        if (monacoInstance.current) {
          onChange(monacoInstance.current.getValue())
          if ($monacoContainer.current) {
            if (model.current) {
              $monacoContainer.current.style.height = `${model.current.getLineCount() * 19}px`
            }
            monacoInstance.current.layout()
            monacoInstance.current.setScrollTop(0)
          }
        }
      })
    }
  }, [])

  // Trigger intellisense with Alt + Space too since Cmd + Space is reserved on macOS.
  useEffect(() => {
    if (monacoInstance.current) {
      monacoInstance.current.addCommand(
        // tslint:disable:no-bitwise i am a 7331 haxx0r
        KeyMod.Alt | KeyCode.Space,
        () => {
          if (monacoInstance.current) {
            monacoInstance.current.trigger("", "editor.action.triggerSuggest", null)
          }
        },
        "",
      )
    }
  }, [])

  return <MonacoContainer ref={$monacoContainer} />
}

export default MonacoEditor
