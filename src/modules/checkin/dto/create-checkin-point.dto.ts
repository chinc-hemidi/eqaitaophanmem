import { IsBoolean, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCheckinPointDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsDateString()
  activeFrom?: string;

  @IsOptional()
  @IsDateString()
  activeTo?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
