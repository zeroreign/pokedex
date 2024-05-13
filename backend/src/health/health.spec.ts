import { Test, TestingModule } from '@nestjs/testing';
import { HealthModule } from './health.module';

describe('Health', () => {
  let provider: HealthModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthModule],
    }).compile();

    provider = module.get<HealthModule>(HealthModule);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
