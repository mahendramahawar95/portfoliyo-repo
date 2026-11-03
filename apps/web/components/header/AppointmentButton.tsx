import Link from "next/link";
import { Button } from "@repo/ui";

export default function AppointmentButton() {
  return (
    <Button
      variant={"primary"}
      size="md"
      className="text-background rounded-sm h-11.5"
    >
      <Link href="/login">Login</Link>
    </Button>
  );
}
