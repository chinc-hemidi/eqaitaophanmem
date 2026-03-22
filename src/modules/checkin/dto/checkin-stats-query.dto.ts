import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CheckinStatsQueryDto {
  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  pointCode?: string;
}
