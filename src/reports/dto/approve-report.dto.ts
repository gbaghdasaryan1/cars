import { IsBoolean } from "class-validator";

export class ApproveReportDto{

    @IsBoolean()
    readonly approved: boolean;
}