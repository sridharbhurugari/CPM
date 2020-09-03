import { RobotPrintRequest } from './robot-print-request';
import { Guid } from 'guid-typescript';

describe('RobotPrintRequest', () => {
  it('should create an instance', () => {
    expect(new RobotPrintRequest('', Guid.create())).toBeTruthy();
  });
});
