import { poloniex } from '../src/poloniexService.js';

describe('PoloniexService', () => {
  const arr = [{attr1: 1, attr2: 2, attr3: 3}, {attr1: 1, attr2: 2, attr3: 3}, {attr1: 1, attr2: 2, attr3: 3}]

  describe('mapAttr', () => {
    it('accepts an array of objects and returns an array of one of the objects attributes as a Float', () => {
      expect(poloniex.mapAttr(arr, 'attr2')).toEqual([2,2,2]);
    });
  });

  describe('total', () => {
    it('accepts an array of numbers and returns the sum', () => {
      const arrToSum = poloniex.mapAttr(arr, 'attr1');
      expect(poloniex.total(arrToSum)).toEqual(3);
    });
  });

  describe('formatAvgAttr', () => {
    it('accepts an array of objects and an attribute and returns the average of that attribute', () => {
        expect(poloniex.formatAvgAttr(arr, 'attr2')).toEqual('2.0000');
    });
  });
});
