import Mail from "@ioc:Adonis/Addons/Mail";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { rules, schema } from "@ioc:Adonis/Core/Validator";
import User from "../../Models/User";

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const validators = await schema.create({
      email: schema.string({}, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.confirmed()]),
      full_name: schema.string(),
      phone_number: schema.string(),
    });
    // const data = await request.validate({ schema: validators });

    // const user = await User.create(data);

    const data = await request.validate({ schema: validators });
    const user = await User.create(data);
    await Mail.send((message) => {
      message
        .from("verify@blog.com")
        .to(user.email)
        .subject("Please verify your email");
    });
    await auth.login(user);
    return response.redirect("/");
  }
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const user = await User.findBy("email", email);
      const token = await auth.use("api").attempt(email, password, {
        expiresIn: "30mins",
        name: user?.serialize().email,
      });
      return token;
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }
  public async show({ response, params }: HttpContextContract) {
    const user = await User.find(params.id);
    return response.json({ user });
  }
  public async update({ request, response, params }: HttpContextContract) {
    const data = request.only(["email", "full_name", "phone_number"]);
    const user = await User.findOrFail(params.id);
    user.merge(data);
    await user.save();
    return response.json({ user });
  }
  public async destroy({ response, params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.delete();
    return response.json({ user });
  }
}
