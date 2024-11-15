import { EnterCarDto } from 'src/car/dto/car-input.dto';

export interface ServerToClientEvents {
  enterCar: (payload: EnterCarDto) => void;
  openBarrier: (payload: { open: boolean }) => void;
  refreshAdmin: (payload: { refresh: boolean }) => void;
  errorHandler: (err: Error) => void;
  terminal: (payload: {
    carNumber: string;
    enterAt: string;
    scan: boolean;
  }) => void;
}
