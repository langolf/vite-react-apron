import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "../button/button";
import { layoutStyles } from "./layout.styles";
import { Intercom } from "./intercom";
import { useEffect, useState } from "react";
import { clsx } from "clsx";
import { IntercomLauncher } from "./intercom-launcher";

function Layout() {
  const { root, header, main, footer } = layoutStyles();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Handler for clicking outside or on close button inside the Intercom widget
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const closeButton = target.closest('[data-testid="close-button"]');
      if (closeButton) {
        console.log("Close button clicked");
        setOpen(false);
        return;
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  return (
    <div className={root()}>
      <header className={header()}>
        <h1 className="">Users</h1>
        <Link to="/users/create">
          <Button variant="filled" size="lg" shape="rounded" name="Add user">
            <Plus className="mr-2 size-5" />
            Add user
          </Button>
        </Link>
      </header>

      <main className={main()}>
        <Outlet />
      </main>

      <footer className={footer()}>
        <div className={clsx("intercom-wrapper", { "is-open": open })}>
          <Intercom />
        </div>

        <IntercomLauncher
          isOpen={open}
          onClick={() => setOpen((prev) => !prev)}
        />
      </footer>
    </div>
  );
}

export { Layout };
