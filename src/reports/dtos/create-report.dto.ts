import { IsNumber } from 'class-validator'

export class CreateReportDTO {

    @IsNumber()
    price: number
}