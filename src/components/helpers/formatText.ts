export default function formatFlavorText(text: string) {
  return text.replace(/\n|\f/g, ' ')
}
