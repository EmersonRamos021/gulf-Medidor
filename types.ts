
export enum TankType {
  TANK_30K = '30000L',
  TANK_15K = '15000L'
}

export interface MeasurementRecord {
  id: string;
  timestamp: number;
  cm: number;
  liters: number;
  tankType: TankType;
}

export interface TankData {
  rows: { [key: number]: number[] };
}
