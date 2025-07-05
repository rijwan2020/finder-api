import { Elysia } from 'elysia';
import { FinderRepository } from '@repositories/finder.repository';
import { FinderService } from '@services/finder.service';
import { FinderController } from '@controllers/finder.controller';

const finderRepo = new FinderRepository();
const finderService = new FinderService(finderRepo);
const finderController = new FinderController(finderService);

export const finder = new Elysia({ prefix: '/finders' })
    .get('/', finderController.getAll)
    .post('/', finderController.create)
    .put('/:id', finderController.update)
    .delete('/:id', finderController.delete);
