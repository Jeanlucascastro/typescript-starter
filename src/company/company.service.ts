import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActiveStatusEnum } from 'src/commom/enum/enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    await this.companyRepository.save(company);
    return company;
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({id: id});
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const event = await this.companyRepository.findOneBy({id: id})
    const eventUpdated = await this.companyRepository.save(
      Object.assign(event, updateCompanyDto),
    );
    return eventUpdated;
  }

  remove(id: number) {
    this.companyRepository.update(id, {
      status: ActiveStatusEnum.INATIVE,
    });
    return;
  }
}
