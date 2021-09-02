import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';

@Injectable()
export class GetProductsByProviderService extends ProviderRepository {
  constructor(private providerRepository: Repository<Provider>) {
    super(providerRepository);
  }

  async getProductsByProvider(id: number): Promise<Provider[]> {
    const provider = await this.providerRepository.find({
      relations: ['products'],
      where: { id },
    });
    if (
      provider.length < 1 ||
      Object.values(provider[0] ? provider[0] : []).length < 1
    )
      throw new HttpException('No Content', HttpStatus.NO_CONTENT);
    return provider;
  }
}
