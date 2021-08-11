import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile(); // return the module ready for testing (this module is asynchronous)

    appController = app.get<AppController>(AppController); // to get an static intance (get())
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController).toBeDefined();
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
