export class SubUnitArray extends Array {
  constructor() {
    super();
  }

  data (data, key) {
    return key(data);
  }

}