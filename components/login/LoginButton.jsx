

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", { redirectTo: "/" })
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 