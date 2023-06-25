import { Expose, Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNumber, IsString, Max, Min } from "class-validator";

export class GetEstimateDto {
  
    @IsString()
    readonly make: string;
  
    @IsString()
    readonly model: string;
  
    @Transform(({value}) => +value)
    @IsNumber()
    @Min(1930)
    @Max(2050)
    readonly year: number;
  
    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    readonly lng: number;
  
    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    readonly lat: number;
  
    @Transform(({value}) => +value)
    @IsNumber()
    @Min(0)
    @Max(1000000)
    readonly mileage: number;
}