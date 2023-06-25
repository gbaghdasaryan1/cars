import { Expose, Transform } from "class-transformer";
import { User } from "src/users/user.entity";

export class ReportDto{
    @Expose()
    readonly id: number;

    @Expose()
    readonly price: number;

    @Expose()
    readonly make: string;

    @Expose()
    readonly model: string;

    @Expose()
    readonly year: number;

    @Expose()
    readonly lng: number;

    @Expose()
    readonly lat: number;

    @Expose()
    readonly mileage: number;

    @Expose()
    readonly approved: boolean;

    @Transform(({obj}) => obj?.user?.id)
    @Expose()
    readonly userId: number;
}