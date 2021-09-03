import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProviderDto } from 'src/providers/dtos/providers.dtos';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProviderRepository } from 'src/providers/repositories/provider-repository';
import { Repository } from 'typeorm';
import { FindProviderService } from './find-provider.service';

@Injectable()
export class UpdateProviderService extends ProviderRepository {
  constructor(
    private providerRepository: Repository<Provider>,
    private findProviderService: FindProviderService,
  ) {
    super(providerRepository);
  }

  async updateProvider(
    id: number,
    payload: UpdateProviderDto,
  ): Promise<Provider> {
    const provide = await this.findProviderService.findProvider(id);
    if (!provide) throw new NotFoundException(`Provider #${id} doesn't exist`);
    this.providerRepository.merge(provide, payload);
    return this.providerRepository.save(provide);
  }
}
