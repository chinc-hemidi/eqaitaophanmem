import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCheckinDto {
  @IsString()
  @MaxLength(30)
  checkinPointCode!: string;

  @IsString()
  @MaxLength(20)
  emotionZoneCode!: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
