import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator'
import { Transform } from 'class-transformer';

export class GetEstimateDTO {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseInt(value))
    @Min(1990)
    @Max(2030)
    @IsNumber()
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLatitude()
    lat: number;

    @Transform(({ value }) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({ value }) => parseInt(value))
    @Min(0)
    @Max(1000000)
    @IsNumber()
    mileage: number

}