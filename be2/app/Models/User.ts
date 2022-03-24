import Hash from "@ioc:Adonis/Core/Hash";
import {
  BaseModel,
  beforeSave,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Permission from "./Permission";
import Role from "./Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;
  @hasMany(() => Role)
  public roles: HasMany<typeof Role>;
  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>;
  @column()
  public email: string;
  @column()
  public password: string;
  @column()
  public fullName: string;
  @column()
  public phoneNumber: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
