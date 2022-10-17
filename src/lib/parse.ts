import type { JSONContent } from "@tiptap/core"

const marks = {
  "bold": "",
  "italic": "",
  "strike": ""
}

export function convertParagraph(content: JSONContent): string {
  if (content.type !== "paragraph") return ""
  if (content.content == null) return ""
  return content.content.map(contentual => {
    return contentual.text ?? ""
  }).join("")
}

export function parse(content: JSONContent): string[] {
  if (content == null) return []
  if (content.type !== "doc") throw "Not a document"
  if (content.content == null) throw "Doc has no content"

  if (content.content.length === 0) {
    return [];
  }

  return content.content.map(convertParagraph).flat()
}