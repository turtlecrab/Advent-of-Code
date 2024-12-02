import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day02.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseReports(input: string): number[][] {
  return input.split('\n').map(line => line.split(' ').map(Number))
}

export function isSafeReport(report: number[]): boolean {
  const isStartIncreasing = report[1] > report[0]

  for (let i = 1; i < report.length; i++) {
    const delta = Math.abs(report[i] - report[i - 1])
    const isCurrentIncreasing = report[i] - report[i - 1] > 0

    if (delta === 0 || delta > 3) return false
    if (isCurrentIncreasing !== isStartIncreasing) return false
  }

  return true
}

export function getSafeReportsCount(reports: number[][]): number {
  return reports.filter(isSafeReport).length
}

console.log(getSafeReportsCount(parseReports(input)))
