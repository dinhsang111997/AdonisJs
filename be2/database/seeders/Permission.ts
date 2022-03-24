import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Permission from "../../app/Models/Permission";

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Permission.createMany([
      {
        name: "Delete",
        slug: "delete",
      },

      {
        name: "Edit",
        slug: "edit",
      },
      {
        name: "Update",
        slug: "update",
      },
    ]);
  }
}
