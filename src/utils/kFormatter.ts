export default function kFormatter(num: number): string {
  if (Math.abs(num) > 999999) {
    const formattedNum = (Math.abs(num) / 1000000).toFixed(1)
    const result = parseFloat(formattedNum) // Remove the decimal point if it's followed by a zero
    return result + 'M'
  } else if (Math.abs(num) > 999) {
    const formattedNum = (Math.abs(num) / 1000).toFixed(1)
    const result = parseFloat(formattedNum)
    return result + 'K'
  }
  return String(Math.sign(num) * Math.abs(num))
}
