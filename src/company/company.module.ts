import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Company]),
    CompanyModule,
  ],
  exports: [CompanyService],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
