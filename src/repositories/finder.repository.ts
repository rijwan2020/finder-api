import { Finder } from "@models/finder.model";

export class FinderRepository {
    getAll = (where: any = {}) => {
        return Finder.findAll({
            where,
            order: [['type', 'DESC']]
        });
    }

    getById = (id: number) => Finder.findByPk(id);

    create = (data: {
        name: string;
        type: string;
        parent_id?: number;
        total_child?: number;
    }) => Finder.create(data);

    update = async (
        id: number,
        data: Partial<{
            name: string;
            type: string;
            parent_id: number;
            total_child: number;
        }>
    ) => {
        const finder = await Finder.findByPk(id);
        return finder?.update(data);
    };

    delete = async (id: number) => {
        const user = await Finder.findByPk(id);
        return user?.destroy();
    };

    deleteByParentId = async (parentId: number) => {
        return Finder.destroy({
            where: { parent_id: parentId },
        });
    };
}
