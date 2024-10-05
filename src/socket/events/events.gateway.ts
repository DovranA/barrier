import { EnterCarDto } from 'src/car/dto/car-input.dto';

export interface ServerToClientEvents {
  enterCar: (payload: EnterCarDto) => void;
  openBarrier: (payload: { open: boolean }) => void;
}
