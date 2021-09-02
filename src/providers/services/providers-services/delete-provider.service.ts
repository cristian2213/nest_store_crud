import { Injectable, NotFoundException } from '@nestjs/common';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';
import { FindProviderService } from './find-provider.service';

@Injectable()
export class DeleteProviderService extends ProviderRepository {
  constructor(
    private providerRepository: Repository<Provider>,
    private findProviderService: FindProviderService,
  ) {
    super(providerRepository);
  }
  async deleteProvider(id: number): Promise<Provider> {
    const provide = await this.findProviderService.findProvider(id);
    if (!provide) throw new NotFoundException(`Provider #${id} doesn't exist`);
    await this.providerRepository.delete(id);
    return provide;
  }
}
