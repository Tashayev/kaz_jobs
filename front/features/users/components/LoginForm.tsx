import { FieldGroup, FieldSet } from "@/components/ui/field"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import * as z from "zod"
import { toast } from "sonner"
import ControllerInput from "@/components/ui/inputs/ControllerInput"
import useUser from ".."

const LoginForm = () => {
  const { handleLogIn } = useUser()
  const formSchema = z.object({
    email: z.email("Invalid email."),
    password: z.string().min(6),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    })
    handleLogIn(data)
  }
  return (
    <FieldSet className="w-full">
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="gap-4">
          <ControllerInput
            name="email"
            form={form}
            label="Email"
            placeholder="example@email.com"
          />

          <ControllerInput
            name="password"
            form={form}
            label="Password"
            placeholder="••••••"
            type="password"
          />

          <button
            type="submit"
            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Login
          </button>
        </FieldGroup>
      </form>
    </FieldSet>
  )
}

export default LoginForm
