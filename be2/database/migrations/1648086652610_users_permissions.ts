import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersPermissions extends BaseSchema {
  protected tableName = "users_permissions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("user_id").unsigned().references("users.id");
      table.integer("permission_id").unsigned().references("permissions.id");
      table.unique(["user_id", "permission_id"]);
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
