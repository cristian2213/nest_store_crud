import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';

@Injectable()
export class FindProvidersService extends ProviderRepository {
  constructor(private providerRepository: Repository<Provider>) {
    super(providerRepository);
  }

  async findProviders(): Promise<Provider[]> {
    const providers = await this.providerRepository.find();
    return providers;
  }
}
