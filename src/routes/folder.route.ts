import { Elysia } from 'elysia';
import { FolderRepository } from '@repositories/folder.repository';
import { FolderService } from '@services/folder.service';
import { FolderController } from '@controllers/folder.controller';

const folderRepo = new FolderRepository();
const folderService = new FolderService(folderRepo);
const folderController = new FolderController(folderService);

export const folder = new Elysia({ prefix: '/folders' })
    .get('/', folderController.getAll)
    .post('/', folderController.create);
