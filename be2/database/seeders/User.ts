import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "../../app/Models/User";

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: "dinhsang111997@gmail.com",
        password: "Tauday@1997",
      },
      {
        email: "lequang@gmail.com",
        password: "Tauday@1997",
      },
      {
        email: "quangtran@gmail.com",
        password: "Tauday@1997",
      },
    ]);
  }
}
