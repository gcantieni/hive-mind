export class ResourceList {
  constructor(nectar = 0, pollen = 0, honey = 0, wax = 0) {
    this.values = new Map(
      [
        ['Nectar', nectar],
        ['Pollen', pollen],
        ['Honey', honey],
        ['Wax', wax]
      ]
    );
  }
  canCover(costList) {
    let coverable = true;
    for(let name of this.values.keys()) {
      if (costList.values.get(name) > this.values.get(name))
        coverable = false;
    }
    return coverable;
  }
  subtract(costList) {
    for (let name of this.values.keys()) {
      this.values.set(name, this.values.get(name) - costList.values.get(name));
    }
  }
}
