import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../entities/provider.entity';

export class ProviderRepository {
  constructor(
    @InjectRepository(Provider) public productsRepository: Repository<Provider>,
  ) {}
}
