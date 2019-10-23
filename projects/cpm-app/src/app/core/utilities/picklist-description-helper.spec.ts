import { PicklistDescriptionHelper } from "./picklist-description-helper";

describe('PicklistDescriptionHelper', () => {
  it('should create an instance', () => {
    expect(new PicklistDescriptionHelper()).toBeTruthy();
  });

  describe('DisplayGenericName', () => {
    describe('given medorder or manual dispense', () => {
      const picklistTypeDb = 'P';
      const priorityCode = 'FIRST DOSE';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return true', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeTruthy();
        })
      });
    });
    describe('given cabinet restock', () => {
      const picklistTypeDb = 'N';
      const priorityCode = 'NORMAL';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
    });
  })

  describe('DisplayBrandName', () => {
    describe('given medorder or manual dispense', () => {
      const picklistTypeDb = 'P';
      const priorityCode = 'FIRST DOSE';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayBrandName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return true', () => {
          expect(PicklistDescriptionHelper.DisplayBrandName(itemCount, picklistTypeDb, priorityCode)).toBeTruthy();
        })
      });
    });
    describe('given cabinet restock', () => {
      const picklistTypeDb = 'N';
      const priorityCode = 'NORMAL';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
    });
  })

  describe('DisplayItemCount', () => {
    describe('given medorder or manual dispense', () => {
      const picklistTypeDb = 'P';
      const priorityCode = 'FIRST DOSE';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return true', () => {
          expect(PicklistDescriptionHelper.DisplayItemCount(itemCount, picklistTypeDb, priorityCode)).toBeTruthy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayItemCount(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
    });
    describe('given cabinet restock', () => {
      const picklistTypeDb = 'N';
      const priorityCode = 'NORMAL';

      describe('and multiple items', () => {
        const itemCount = 5;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
      describe('and one item', () => {
        const itemCount = 1;
        it('should return false', () => {
          expect(PicklistDescriptionHelper.DisplayGenericName(itemCount, picklistTypeDb, priorityCode)).toBeFalsy();
        })
      });
    });
  })
});
