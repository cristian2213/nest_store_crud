import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';

@Injectable()
export class GetProvidersWithProductsService extends ProviderRepository {
  constructor(private providerRepository: Repository<Provider>) {
    super(providerRepository);
  }

  async getProvidersWithProducts(): Promise<Provider[]> {
    const providers = await this.providerRepository.find({
      relations: ['products'],
    });
    if (providers.length < 1)
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    return providers;
  }
}
