import { Field, FieldGroup, FieldSet, FieldLabel} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const LoginForm = () => {
  return (
    <FieldSet className="w-full">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" placeholder="Max Leiter" />
          {/* <FieldDescription>
            Choose a unique username for your account.
          </FieldDescription> */}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          {/* <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription> */}
          <Input id="password" type="password" placeholder="••••••••" />
        </Field>
      </FieldGroup>
    </FieldSet>
  )
}

export default LoginForm