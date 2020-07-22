import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  var pipe: SearchPipe;
  beforeEach(() => {
    pipe = new SearchPipe();
  })

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('given no data to search', () => {
    it('should return the empty array', () => {
      var data = [];
      var result = pipe.transform(data, 'searchThis');
      expect(result).toBe(data);
    });
  });

  describe('given data to search', () => {
    var data: any[];
    const checkKey = 'key';
    const checkValue = 'value';
    const excludeKey = 'exclude';
    const excludeValue = 'dontsearch';
    beforeEach(() => {
      data = [];
      var element = { };
      element[checkKey] = checkValue;
      element[excludeKey] = excludeValue;
      var noMatch = { };
      noMatch[checkKey] = '----------';
      noMatch[excludeKey] = '----------';
      data.push(element);
      data.push(noMatch);
    })
    describe('and given undefined search  text', () => {
      it('should return the same array', () => {
        var result = pipe.transform(data, undefined);
        expect(result).toBe(data);
      });
    });

    describe('and given empty search  text', () => {
      it('should return the same array', () => {
        var result = pipe.transform(data, '');
        expect(result).toBe(data);
      });
    });

    describe('and given some search text', () => {
      var searchText: string;
      describe('and given search properties are specified', () => {
        const searchProperties = [ checkKey ];
        it('should search the supplied property and return a match', () => {
          searchText = checkValue;
          var result = pipe.transform(data, searchText, searchProperties);
          expect(result.length).toEqual(1);
        });

        it('should not return a match for excluded properties', () => {
          searchText = excludeValue;
          var result = pipe.transform(data, searchText, searchProperties);
          expect(result.length).toEqual(0);
        });
      });
      describe('and given no search properties are specified', () => {
        it('should return search all properties and return a match', () => {
          searchText = checkValue;
          var result = pipe.transform(data, searchText);
          expect(result.length).toEqual(1);
          searchText = excludeValue;
          var result = pipe.transform(data, searchText);
          expect(result.length).toEqual(1);
        })
      });
    });
  });
});
