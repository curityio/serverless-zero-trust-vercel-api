export function random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  
  export function getData() {
    const adjectives = [
      'adorable',
      'agreeable',
      'alert',
      'alive',
      'amused',
      'angry',
      'annoyed',
      'annoying',
      'anxious'
    ]
  
    const verbs = [
      'correct',
      'respect',
      'tolerate',
      'believe',
      'maintain'
    ]
  
    const nouns = [
      'women',
      'shoe',
      'basketball',
      'cousin',
      'house',
      'lawyer',
      'table'
    ]
  
    return `${random(verbs)} ${random(adjectives)} ${random(
      adjectives
    )} ${random(nouns)}`
  }