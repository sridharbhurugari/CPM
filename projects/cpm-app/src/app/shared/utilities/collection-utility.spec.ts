import { CollectionUtility } from './collection-utility';

describe('CollectionUtility', () => {
  let left: number[];
  let right: number[]
  it('should create an instance', () => {
    expect(new CollectionUtility()).toBeTruthy();
  });

  describe('given left is null', () => {
    beforeEach(() => {
      left = null;
    });

    describe('and right is null', () => {
      beforeEach(() => {
        right = null;
      });

      it('should return true', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeTruthy();
      });
    });

    describe('and right is not null', () => {
      beforeEach(() => {
        right = [ 4, 8, 12 ];
      });
      
      it('should return false', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeFalsy();
      });
    });
  });

  describe('given left contains values', () => {
    beforeEach(() => {
      left = [ 24, 48, 96 ];
    });

    describe('and right is null', () => {
      beforeEach(() => {
        right = null;
      });

      it('should return false', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeFalsy();
      });
    });

    describe('and right contains the same values', () => {
      beforeEach(() => {
        right = [24, 48, 96];
      });

      it('should return true', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeTruthy();
      });
    });

    describe('and right is missing a value', () => {
      beforeEach(() => {
        right = [24, 48 ];
      });

      it('should return false', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeFalsy();
      });
    });

    describe('and right contains an additional value', () => {
      beforeEach(() => {
        right = [24, 48, 96, 192 ];
      });

      it('should return false', () => {
        var result = CollectionUtility.areEquivalent(left, right);
        expect(result).toBeFalsy();
      });
    });
  })
});
