import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Role from "../../app/Models/Role";

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: "Admin",
        slug: "admin",
      },

      {
        name: "User",
        slug: "user",
      },
    ]);
  }
}
