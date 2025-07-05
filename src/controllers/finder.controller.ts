import { Finder } from '@models/finder.model';
import { FinderService } from '@services/finder.service';
import { Context } from 'elysia';

export class FinderController {
    constructor(private finderSvc: FinderService) { }
    getAll = async ({ query }: Context<{
        query: {
            parent_id?: string;
            type?: string;
        }
    }>) => {
        const response: {
            data: Finder[];
            message: string;
            code: number;
        } = {
            data: [],
            message: 'Fetch finder successful',
            code: 200,
        };
        try {
            const finders = await this.finderSvc.getFinders(query);
            response.data = finders;

        } catch (error) {
            response.message = 'Failed to fetch finder data';
            response.code = 500;
        }
        return response;
    };

    create = async ({ body }: Context<{
        body: {
            name: string;
            type: string;
            parent_id?: number
        }
    }>) => {
        const response: {
            data?: Finder;
            message: string;
            code: number;
        } = {
            data: undefined,
            message: 'Create finder successful',
            code: 200,
        };
        try {
            response.data = await this.finderSvc.create(body);
        } catch (error) {
            response.message = 'Failed to create finder data';
            response.code = 500;
        }
        return response;
    }

    update = async ({ params, body }: Context<{
        body: { name: string };
        params: { id: string }
    }>) => {
        const response: {
            data?: Finder;
            message: string;
            code: number;
        } = {
            data: undefined,
            message: 'Update finder successful',
            code: 200,
        };
        try {
            response.data = await this.finderSvc.update(Number(params.id), body);
        } catch (error) {
            response.message = 'Failed to update finder data';
            response.code = 500;
        }
        return response;
    }

    delete = async ({ params }: Context) => {
        const response: {
            data: boolean;
            message: string;
            code: number;
        } = {
            data: true,
            message: 'Delete finder successful',
            code: 200,
        };
        try {
            await this.finderSvc.delete(Number(params.id));
        } catch (error) {
            console.log('🚀 ~ FinderController ~ delete ~ error:', error);
            response.data = false;
            response.message = 'Failed to delete finder data';
            response.code = 500;
        }
        return response;
    }
}
