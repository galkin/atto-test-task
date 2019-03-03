import { Expose, Type } from 'class-transformer';

export class Asset {
  @Expose() id: string;
  @Expose() @Type(() => Number) rank: number;
  @Expose() symbol: string;
  @Expose() name: string;
  @Type(() => BigInt) supply: BigInt;
  @Type(() => BigInt) maxSupply: BigInt;
  @Type(() => BigInt) marketCapUsd: BigInt;
  @Type(() => BigInt) volumeUsd24Hr: BigInt;
  @Expose() @Type(() => BigInt) priceUsd: BigInt;
  @Type(() => BigInt) changePercent24Hr: BigInt;
  @Type(() => BigInt) vwap24Hr: BigInt;
}
