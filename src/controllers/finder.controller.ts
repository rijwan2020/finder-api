import { Finder } from '@models/finder.model';
import { FinderService } from '@services/finder.service';
import { Context } from 'elysia';

export class FinderController {
    constructor(private finderSvc: FinderService) { }
    getAll = async ({ query }: Context<{
        query: {
            parent_id?: string;
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
            const finders = await this.finderSvc.getFinders({
                parent_id: query.parent_id ? Number(query.parent_id) : undefined,
            });
            response.data = finders;

        } catch (error) {
            console.log('🚀 ~ FinderController ~ error:', error);
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
            message: 'Create finder successful',
            code: 200,
        };
        try {
            response.data = await this.finderSvc.update(Number(params.id), body);
        } catch (error) {
            response.message = 'Failed to create finder data';
            response.code = 500;
        }
        return response;
    }
}
