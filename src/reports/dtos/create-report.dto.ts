import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from 'class-validator'

export class CreateReportDTO {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(1990)
    @Max(2030)
    @IsNumber()
    year: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;

    @Min(0)
    @Max(1000000)
    @IsNumber()
    mileage: number

    @Min(0)
    @Max(10000000)
    @IsNumber()
    price: number
}