import { Injectable, NotFoundException } from '@nestjs/common';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';

@Injectable()
export class FindProviderService extends ProviderRepository {
  constructor(private providerRepository: Repository<Provider>) {
    super(providerRepository);
  }

  async findProvider(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne(id);
    if (!provider) throw new NotFoundException(`Provider #${id} doesn't exist`);
    return provider;
  }
}
