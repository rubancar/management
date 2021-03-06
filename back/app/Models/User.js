'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
    static boot () {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', 'UserHook.hashPassword')
    }

    /**
     * A relationship on tokens is required for auth to
     * work. Since features like `refreshTokens` or
     * `rememberToken` will be saved inside the
     * tokens table.
     *
     * @method tokens
     *
     * @return {Object}
     */
    tokens () {
        return this.hasMany('App/Models/Token')
    }

    stores () {
        return this.belongsToMany('App/Models/Store', 'user_id', 'store_id')
            .pivotTable('store_user')
    }

    static get hidden() {
        return ['created_at', 'updated_at', 'deleted_at', 'created_by', 'password']
    }
}

module.exports = User
