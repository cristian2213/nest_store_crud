import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';
import { CreateProviderDto, UpdateProviderDto } from '../dtos/providers.dtos';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider) private providerRepo: Repository<Provider>,
  ) {}

  async findAll(): Promise<Provider[]> {
    const providers = await this.providerRepo.find();
    if (providers.length < 1)
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);

    return providers;
  }

  async findOne(id: number): Promise<Provider> {
    const provider = await this.providerRepo.findOne(id);
    if (!provider) throw new NotFoundException(`Provider #${id} doesn't exist`);

    return provider;
  }

  async create(payload: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepo.create(payload);
    const providerCreated = await this.providerRepo.save(provider);
    return providerCreated;
  }

  async update(id: number, payload: UpdateProviderDto): Promise<Provider> {
    const provide = await this.findOne(id);
    if (!provide) throw new NotFoundException(`Provider #${id} doesn't exist`);

    this.providerRepo.merge(provide, payload);
    return await this.providerRepo.save(provide);
  }

  async delete(id: number): Promise<Provider> {
    const provide = await this.findOne(id);
    if (!provide) throw new NotFoundException(`Provider #${id} doesn't exist`);
    await this.providerRepo.delete(id);
    return provide;
  }
}
