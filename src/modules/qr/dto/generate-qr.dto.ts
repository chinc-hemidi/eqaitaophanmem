import { IsString, MaxLength } from 'class-validator';

export class GenerateQrDto {
  @IsString()
  @MaxLength(30)
  pointCode!: string;
}
