export function test(given: any, expected: any) {
  console.log(given, expected, given === expected ? '✅' : '❌')
}

function shallowEqual(obj1: any, obj2: any) {
  for (let key in obj1) {
    if (obj1[key] !== obj2[key]) return false
  }
  return true
}

export function testShallow(given: any, expected: any) {
  console.log(given, expected, shallowEqual(given, expected) ? '✅' : '❌')
}
