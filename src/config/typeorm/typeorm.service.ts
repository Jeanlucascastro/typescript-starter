import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgre",
      database: "oasis",
      synchronize: true as any,
      entities: ["dist/**/*.entity{.ts,.js}"],
    };
  }
}