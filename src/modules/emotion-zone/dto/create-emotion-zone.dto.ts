import { IsEnum, IsHexColor, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';

import { EmotionCode } from '@/common/enums/emotion-code.enum';

export class CreateEmotionZoneDto {
  @IsEnum(EmotionCode)
  code!: EmotionCode;

  @IsString()
  @MaxLength(100)
  name!: string;

  @IsHexColor()
  color!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number;
}
