import { Expose } from "class-transformer";
import { IsNumber, IsString, Min,Max,IsLatitude, IsLongitude } from "class-validator";

export class CreateReportDto{
    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly price: number;
  
    @Expose()
    @IsString()
    readonly make: string;
  
    @IsString()
    readonly model: string;
  
    @IsNumber()
    @Min(1930)
    @Max(2050)
    readonly year: number;
  
    @IsLongitude()
    readonly lng: number;
  
    @IsLatitude()
    readonly lat: number;
  
    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly mileage: number;
}