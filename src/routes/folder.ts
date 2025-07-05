import { Elysia } from 'elysia';
import { FolderRepository } from '@repositories/folderRepository';
import { FolderService } from '@services/folderService';
import { FolderController } from '@controllers/folderController';

const folderRepo = new FolderRepository();
const folderService = new FolderService(folderRepo);
const folderController = new FolderController(folderService);

export const folder = new Elysia({ prefix: '/folders' });
