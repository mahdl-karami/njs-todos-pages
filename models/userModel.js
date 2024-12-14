import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  todos: [
    {
      title: String,
      stage: {
        type: Number,
        min: 1,
        max: 4,
      },
    },
  ],
});

const TodoUser = models.TodoUser || model("TodoUser", userSchema);

export default TodoUser;
