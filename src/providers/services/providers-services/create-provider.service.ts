import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from 'src/providers/dtos/providers.dtos';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';

@Injectable()
export class CreateProviderService extends ProviderRepository {
  constructor(private providerRepository: Repository<Provider>) {
    super(providerRepository);
  }

  async createProvider(payload: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(payload);
    return this.providerRepository.save(provider);
  }
}
