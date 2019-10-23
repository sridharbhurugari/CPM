import { PicklistDestinationDescriptionHelper } from "./picklist-destination-description-helper";
import { RestockTypes } from '../constants/restock-types';
import { DispensePriorityCodes } from '../constants/dispense-priority-codes';

describe('PicklistDestinationDescriptionHelper', () => {
  it('should create an instance', () => {
    expect(new PicklistDestinationDescriptionHelper()).toBeTruthy();
  });

  describe('DisplayPatientCount', () => {
    describe('given med order', () => {
      const picklistTypeDb = RestockTypes.PatientMedOrder;
      describe('given one patient', () => {
        const patientCount = 1;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientCount(patientCount, picklistTypeDb)).toBeFalsy();
        })
      });
      describe('given multiple patients', () => {
        const patientCount = 4;
        it('should return true', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientCount(patientCount, picklistTypeDb)).toBeTruthy();
        })
      });
    });
    describe('given normal restock', () => {
      const picklistTypeDb = RestockTypes.NormalRestock;
      describe('given one patient', () => {
        const patientCount = 1;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientCount(patientCount, picklistTypeDb)).toBeFalsy();
        })
      });
      describe('given multiple patients', () => {
        const patientCount = 4;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientCount(patientCount, picklistTypeDb)).toBeFalsy();
        })
      });
    });
  });

  describe('DisplayPatientRoomAndArea', () => {
    describe('given med order', () => {
      const picklistTypeDb = RestockTypes.PatientMedOrder;
      describe('given one patient', () => {
        const patientCount = 1;
        describe('with patient room and area', () => {
          const patientRoom = '301a';
          const area  = 'ICU';
          it('should return true', () => {
            expect(PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(patientCount, picklistTypeDb, patientRoom, area)).toBeTruthy();
          })
        })
        describe('with no patient room or area', () => {
          const patientRoom = undefined;
          const area  = undefined;
          it('should return false', () => {
            expect(PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(patientCount, picklistTypeDb, patientRoom, area)).toBeFalsy();
          })
        })
      });
      describe('given multiple patients', () => {
        const patientCount = 4;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(patientCount, undefined, undefined, undefined)).toBeFalsy();
        });
      });
    });
    describe('given normal restock', () => {
      const picklistTypeDb = RestockTypes.NormalRestock;
      it('should return false', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayPatientRoomAndArea(undefined, picklistTypeDb, undefined, undefined)).toBeFalsy();
      })
    });
  });

  describe('DisplayPatientRoom', () => {
    describe('given med order', () => {
      const picklistTypeDb = RestockTypes.PatientMedOrder;
      describe('given one patient', () => {
        const patientCount = 1;
        describe('with patient room', () => {
          const patientRoom = '301a';
          describe('and area', () => {
            const area = 'ICU';
            it('should return false', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area)).toBeFalsy();
            });
          });
          describe('but no area', () => {
            const area = undefined;
            it('should return true', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area)).toBeTruthy();
            });
          });
        })
        describe('with no patient room', () => {
          const patientRoom = undefined;
          describe('and with area', () => {
            const area = 'ICU';
            it('should return false', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area)).toBeFalsy();
            });
          });
          describe('and no area', () => {
            const area = undefined;
            it('should return false', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(patientCount, picklistTypeDb, patientRoom, area)).toBeFalsy();
            });
          });
        });
      });
      describe('given multiple patients', () => {
        const patientCount = 4;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(patientCount, undefined, undefined, undefined)).toBeFalsy();
        });
      });
    });
    describe('given normal restock', () => {
      const picklistTypeDb = RestockTypes.NormalRestock;
      it('should return false', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayPatientRoom(undefined, picklistTypeDb, undefined, undefined)).toBeFalsy();
      })
    });
  });

  describe('DisplayMultiDestination', () => {
    describe('given med order', () => {
      const picklistTypeDb = RestockTypes.PatientMedOrder;
      it('should return false', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayMultiDestination(undefined, picklistTypeDb)).toBeFalsy();
      });
    });
    describe('given normal restock', () => {
      const picklistTypeDb = RestockTypes.NormalRestock;
      describe('with multiple destinations', () => {
        const destinationCount = 4;
        it('should return true', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayMultiDestination(destinationCount, picklistTypeDb)).toBeTruthy();
        })
      });
      describe('with one destinations', () => {
        const destinationCount = 1;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayMultiDestination(destinationCount, picklistTypeDb)).toBeFalsy();
        })
      });
    });
  });

  describe('DisplayArea', () => {
    describe('given med order', () => {
      const picklistTypeDb = RestockTypes.PatientMedOrder;
      const priorityCode = DispensePriorityCodes.Patient;
      describe('given one patient', () => {
        const patientCount = 1;
        const destinationCount = 1;
        describe('with patient room and area', () => {
          const patientRoom = '301a';
          const area  = 'ICU';
          it('should return false', () => {
            expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeFalsy();
          })
        })
        describe('with no patient room', () => {
          const patientRoom = undefined;
          describe('and no area', () => {
            const area = undefined;
            it('should return false', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeFalsy();
            })
          });
          describe('with area', () => {
            const area = 'ICU';
            it('should return true', () => {
              expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeTruthy();
            })
          })
        })
      });
      describe('given multiple patients', () => {
        const patientCount = 4;
        const destinationCount = 4;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, undefined, undefined)).toBeFalsy();
        });
      });
    });
    describe('given stock out', () => {
      const picklistTypeDb = RestockTypes.StockOut;
      const priorityCode = DispensePriorityCodes.StockOut;
      const patientCount = 0;
      const destinationCount = 1;
      const patientRoom = undefined;
      const area = 'ICU';
      it('should return true', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeTruthy();
      });
    });
    describe('given manual area dispense', () => {
      const picklistTypeDb = RestockTypes.DispenseToDestination;
      const priorityCode = DispensePriorityCodes.Area;
      const patientCount = 0;
      const destinationCount = 1;
      const patientRoom = undefined;
      const area = 'ICU';
      it('should return true', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeTruthy();
      });
    });
    describe('given selective restock', () => {
      const picklistTypeDb = RestockTypes.SelectiveRestock;
      const priorityCode = DispensePriorityCodes.Normal;
      const patientCount = 0;
      const destinationCount = 1;
      const patientRoom = undefined;
      const area = 'ICU';
      it('should return true', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayArea(patientCount, destinationCount, picklistTypeDb, priorityCode, patientRoom, area)).toBeTruthy();
      });
    });
  });

  describe('DisplayOmniName', () => {
    describe('given normal cabinet restock with one destination', () => {
      const picklistTypeDb = RestockTypes.NormalRestock;
      const priorityCode = DispensePriorityCodes.Normal;
      const patientCount = 0;
      const destinationCount = 1;
      it('should return true', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayOmniName(patientCount, destinationCount, picklistTypeDb, priorityCode, undefined, undefined)).toBeTruthy();
      });
    });
    describe('given manual cabinet dispense', () => {
      const picklistTypeDb = RestockTypes.DispenseToDestination;
      const priorityCode = DispensePriorityCodes.Cabinet;
      const patientCount = 0;
      const destinationCount = 1;
      it('should return true', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayOmniName(patientCount, destinationCount, picklistTypeDb, priorityCode, undefined, undefined)).toBeTruthy();
      });
    })
  });

  describe('DisplayPatientName', () => {
    describe('given one destination', () => {
      const destinationCount = 1;
      describe('for manual dispense', () => {
        const picklistTypeDb = RestockTypes.DispenseToDestination;
        const priorityCode = DispensePriorityCodes.Area;
        it('should return false', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(destinationCount, picklistTypeDb, priorityCode)).toBeFalsy();
        });
      });
      describe('for med order', () => {
        const picklistTypeDb = RestockTypes.PatientMedOrder;
        const priorityCode = DispensePriorityCodes.Patient;
        it('should return true', () => {
          expect(PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(destinationCount, picklistTypeDb, priorityCode)).toBeTruthy();
        });
      });
    });
    describe('given multiple destinations', () => {
      const destinationCount = 4;
      it('should return false', () => {
        expect(PicklistDestinationDescriptionHelper.DisplayPatientNameSecondLine(destinationCount, undefined, undefined)).toBeFalsy();
      });
    });
  });
});
