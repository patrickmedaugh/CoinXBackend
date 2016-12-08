
class PoloniexService {
  mapAttr(arr, attr) {
    return arr.map((x) => {
      return parseFloat(x[attr]);
    });
  };

  total(arr) {
    return arr.reduce((prev, cur) => {
      return prev + cur;
    });
  };

  formatAvg(arr) {
    const rates = this.mapAttr(arr, "rate");
    return parseFloat(this.total(rates) / rates.length).toFixed(4).toString();
  }
}

export let poloniex = new PoloniexService();
