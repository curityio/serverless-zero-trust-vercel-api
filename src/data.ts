/* Class that returns some random data */
export class Data{

  public random(arr: string[]) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  
  public getData() {
    const adjectives = ['adorable', 'agreeable', 'alert', 'alive', 'amused', 'angry', 'annoyed', 'annoying', 'anxious'];
  
    const verbs = ['correct', 'respect', 'tolerate', 'believe', 'maintain'];
  
    const nouns = ['shoe', 'basketball', 'cousin', 'house', 'lawyer', 'table'];
  
    return `${this.random(verbs)} ${this.random(adjectives)} ${this.random(adjectives)} ${this.random(nouns)}`;
  }
}