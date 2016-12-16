
class PoloniexService {
  mapAttr(arr, attr) {
    return arr.map((x) => {
      if (x[attr] !== undefined) {
        return parseFloat(x[attr]);
      } else {
        return parseFloat(x['data'][attr]);
      }
    });
  };

  total(arr) {
    return arr.reduce((prev, cur) => {
      return prev + cur;
    });
  };

  formatAvgAttr(arr, attr) {
    const rates = this.mapAttr(arr, attr);
    return parseFloat(this.total(rates) / rates.length).toFixed(4).toString();
  }
}

export let poloniex = new PoloniexService();
