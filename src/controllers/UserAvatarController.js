const AppError = require('../utils/AppError');
const DiskStorage = require('../providers/DiskStorage');
const knex = require('../database/knex');

class UserAvatarController{
    async update(req, res){
        const user_id = req.user.id;
        const avatarFileName = req.file.filename;
        const diskStorage = new DiskStorage;

        const user = await knex('users').where({id: user_id});

        if(!user)
            throw new AppError('Somente usuários autenticados podem mudar o avatar', 401);
        
        if(user.avatar){
            await diskStorage.delete(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFileName);

        await knex('users')
            .where({ id: user_id})
            .update({ avatar: filename});

        return res.json(user);
    
        }   
}

module.exports = UserAvatarController;