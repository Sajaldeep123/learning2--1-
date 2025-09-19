"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, lastAssistantMessageIsCompleteWithToolCalls } from "ai"
import type { UseChatToolsMessage } from "../api/use-chat-tools/route"

export default function Chat() {
  const { messages, sendMessage, addToolResult, status } = useChat<UseChatToolsMessage>({
    transport: new DefaultChatTransport({ api: "/api/use-chat-tools" }),
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,

    async onToolCall({ toolCall }) {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (toolCall.toolName === "getLocation") {
        const cities = ["New York", "Los Angeles", "Chicago", "San Francisco"]

        addToolResult({
          tool: "getLocation",
          toolCallId: toolCall.toolCallId,
          output: cities[Math.floor(Math.random() * cities.length)],
        })
      }
    },
  })

  return (
    <div className="flex flex-col py-24 mx-auto w-full max-w-md stretch">
      {messages?.map((message) => (
        <div key={message.id} className="whitespace-pre-wrap">
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case "text":
                return <div key={index}>{part.text}</div>

              case "tool-askForConfirmation": {
                switch (part.state) {
                  case "input-available":
                    return (
                      <div key={index} className="text-gray-500">
                        {part.input.message}
                        <div className="flex gap-2">
                          <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                            onClick={async () => {
                              addToolResult({
                                tool: "askForConfirmation",
                                toolCallId: part.toolCallId,
                                output: "Yes, confirmed.",
                              })
                            }}
                          >
                            Yes
                          </button>
                          <button
                            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                            onClick={async () => {
                              addToolResult({
                                tool: "askForConfirmation",
                                toolCallId: part.toolCallId,
                                output: "No, denied",
                              })
                            }}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )
                  case "output-available":
                    return (
                      <div key={index} className="text-gray-500">
                        Location access allowed: {part.output}
                      </div>
                    )
                }
                break
              }

              case "tool-getLocation": {
                switch (part.state) {
                  case "input-available":
                    return (
                      <div key={index} className="text-gray-500">
                        Getting location...
                      </div>
                    )
                  case "output-available":
                    return (
                      <div key={index} className="text-gray-500">
                        Location: {part.output}
                      </div>
                    )
                }
                break
              }

              case "tool-getWeatherInformation": {
                switch (part.state) {
                  case "input-streaming":
                    return <pre key={index}>{JSON.stringify(part.input, null, 2)}</pre>
                  case "input-available":
                    return (
                      <div key={index} className="text-gray-500">
                        Getting weather information for {part.input.city}...
                      </div>
                    )
                  case "output-available":
                    return (
                      <div key={index} className="text-gray-500">
                        {part.output.state === "loading"
                          ? "Fetching weather information..."
                          : `Weather in ${part.input.city}: ${part.output.weather}`}
                      </div>
                    )
                  case "output-error":
                    return (
                      <div key={index} className="text-red-500">
                        Error: {part.errorText}
                      </div>
                    )
                }
              }
            }
          })}
          <br />
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          const input = (e.target as any).message.value
          sendMessage({ text: input })
          ;(e.target as any).message.value = ""
        }}
      >
        <input
          name="message"
          className="fixed bottom-0 p-2 mb-8 w-full max-w-md rounded border border-gray-300 shadow-xl"
          placeholder="Say something..."
          disabled={status === "in_progress"}
        />
      </form>
    </div>
  )
}
