import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarOutputDto, EnterCarOutputDto } from './dto/car-output.dto';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { ListCarsInputDto } from './dto/list-cars.dto';
import { PaginatedOutputDto } from 'src/common/dtos/paginated-output.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCarDto, EnterCarDto } from './dto/car-input.dto';
@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @Get()
  @ApiPaginatedResponse(CarOutputDto)
  async Cars(
    @Query() listCarsInputDto: ListCarsInputDto,
  ): Promise<PaginatedOutputDto<CarOutputDto>> {
    return await this.carService.getCars(listCarsInputDto);
  }

  @HttpCode(200)
  @Post()
  async create(@Body() dto: CreateCarDto) {
    return await this.carService.createCar(dto);
  }

  @HttpCode(200)
  @Get('/num/:num')
  @ApiParam({ name: 'num', description: 'num', type: 'string' })
  async getByNum(@Param() param: { num: string }) {
    const { num } = param;
    return await this.carService.getCarByNum(num);
  }

  @HttpCode(200)
  @Post('/enter')
  @ApiResponse({ status: 200, type: EnterCarOutputDto })
  async enterCar(@Body() car: EnterCarDto) {
    return this.carService.enterCar(car);
  }
  @HttpCode(200)
  @Get('/exists')
  @ApiPaginatedResponse(EnterCarOutputDto)
  async existCars(@Query() listCarsInputDto: ListCarsInputDto) {
    return this.carService.existCars(listCarsInputDto);
  }
  @HttpCode(200)
  @Get('/:id')
  @ApiParam({ name: 'id', description: 'id', type: 'string' })
  async getById(@Param() param: { id: string }) {
    const { id } = param;
    return await this.carService.getCar(id);
  }
}
